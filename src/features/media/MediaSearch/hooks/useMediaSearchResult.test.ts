import { renderHook, act } from '@testing-library/react';
import { MediaResult } from '../../../../types/media.type';
import { useMediaSearchResults } from './useMediaSearchResults';

jest.mock('../../../../utils/mergeUniqueItems', () => ({
  mergeUniqueItems: jest.fn((prev, next) => [...prev, ...next]),
}));

const mockSearchUseCase = jest.fn();
const mockGetUseCase = jest.fn();

const initialData: Omit<MediaResult, 'totalResults'> = {
  data: [
    { id: 1, title: 'Item 1', description: '', releaseDate: '', genres: '', rating: null, image: '', voteCount: null },
    { id: 2, title: 'Item 2', description: '', releaseDate: '', genres: '', rating: null, image: '', voteCount: null },
  ],
  page: 1,
  totalPages: 2,
};

describe('useMediaSearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with initial data', () => {
    const { result } = renderHook(() =>
      useMediaSearchResults({
        initialData,
        searchValue: '',
        searchUseCase: mockSearchUseCase,
        getUseCase: mockGetUseCase,
      })
    );

    expect(result.current.items).toEqual(initialData.data);
    expect(result.current.page).toBe(1);
  });

  it('should call getUseCase when no search value is provided', async () => {
    mockGetUseCase.mockResolvedValueOnce({
      data: [
        { id: 3, title: 'Item 3', description: '', releaseDate: '', genres: '', rating: null, image: '', voteCount: null },
      ],
      page: 2,
      totalPages: 2,
    });

    const { result } = renderHook(() =>
      useMediaSearchResults({
        initialData,
        searchValue: '',
        searchUseCase: mockSearchUseCase,
        getUseCase: mockGetUseCase,
      })
    );

    await act(async () => {
      result.current.handleReachEndOfList();
    });

    expect(mockGetUseCase).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
    expect(result.current.items).toHaveLength(3);
  });

  it('should call searchUseCase when a search value is provided', async () => {
    mockSearchUseCase.mockResolvedValueOnce({
      data: [
        { id: 4, title: 'Search Result', description: '', releaseDate: '', genres: '', rating: null, image: '', voteCount: null },
      ],
      page: 2,
      totalPages: 2,
    });

    const { result } = renderHook(() =>
      useMediaSearchResults({
        initialData,
        searchValue: 'search',
        searchUseCase: mockSearchUseCase,
        getUseCase: mockGetUseCase,
      })
    );

    await act(async () => {
      result.current.handleReachEndOfList();
    });

    expect(mockSearchUseCase).toHaveBeenCalledWith(expect.objectContaining({ query: 'search', page: 2 }));
    expect(result.current.items).toHaveLength(3);
  });

  it('should not fetch items if on the last page', async () => {
    const { result } = renderHook(() =>
      useMediaSearchResults({
        initialData: { ...initialData, page: 2 }, // Already on the last page
        searchValue: '',
        searchUseCase: mockSearchUseCase,
        getUseCase: mockGetUseCase,
      })
    );

    await act(async () => {
      result.current.handleReachEndOfList();
    });

    expect(mockGetUseCase).not.toHaveBeenCalled();
    expect(mockSearchUseCase).not.toHaveBeenCalled();
  });

  it('should reset items when initial data changes', () => {
    const newInitialData: Omit<MediaResult, 'totalResults'> = {
      data: [
        { id: 5, title: 'New Item', description: '', releaseDate: '', genres: '', rating: null, image: '', voteCount: null },
      ],
      page: 1,
      totalPages: 1,
    };

    const { result, rerender } = renderHook(
      (props) => useMediaSearchResults(props),
      {
        initialProps: {
          initialData,
          searchValue: '',
          searchUseCase: mockSearchUseCase,
          getUseCase: mockGetUseCase,
        },
      }
    );

    rerender({
      initialData: newInitialData,
      searchValue: '',
      searchUseCase: mockSearchUseCase,
      getUseCase: mockGetUseCase,
    });

    expect(result.current.items).toEqual(newInitialData.data);
    expect(result.current.page).toBe(1);
  });
});
