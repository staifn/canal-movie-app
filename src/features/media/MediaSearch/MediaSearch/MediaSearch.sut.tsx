import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MediaSearch } from './MediaSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { MediaResult } from '@/types/media.type';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('react-modal', () => {
  const MockModal = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null;

  MockModal.setAppElement = jest.fn();

  return MockModal;
});

export const createMediaSearchSutBuilder = () => {
  const mockedMovies: MediaResult = {
    data: [
      { id: 1, title: 'Movie 1', description: 'Description for Movie 1', releaseDate: '2023-01-01', genres: 'Action', rating: 4.5, image: '/path/to/movie1.jpg', voteCount: 1500 },
      { id: 2, title: 'Movie 2', description: 'Description for Movie 2', releaseDate: '2023-02-01', genres: 'Comedy', rating: 4.0, image: '/path/to/movie2.jpg', voteCount: 1200 },
    ],
    page: 1,
    totalPages: 1,
    totalResults: 2,
  };

  const mockedSeries: MediaResult = {
    data: [
      { id: 101, title: 'Movie 101', description: 'Description for Movie 101', releaseDate: '2022-01-01', genres: 'Drama', rating: 5.0, image: '/path/to/movie101.jpg', voteCount: 2000 },
      { id: 102, title: 'Movie 102', description: 'Description for Movie 102', releaseDate: '2022-02-01', genres: 'Sci-Fi', rating: 4.8, image: '/path/to/movie102.jpg', voteCount: 1800 },
    ],
    page: 1,
    totalPages: 1,
    totalResults: 2,
  };

  const pushMock = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => 'query='),
  };

  return {
    build,
  };

  function build() {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    return {
      given: {
        moviesAndSeriesAreProvided() {
          const utils = render(<MediaSearch movies={mockedMovies} series={mockedSeries} />);
          return {
            cleanup: utils.unmount,
          };
        },
      },
      when: {
        userTypesInSearchInput(value: string) {
          const input = screen.getByPlaceholderText('Recherchez...');
          fireEvent.change(input, { target: { value } });
        },
        userClicksOnMediaImage(index: number) {
          const images = screen.getAllByRole('img');
          fireEvent.click(images[index]); // Clic sur l'image à l'index donné
        },
      },
      then: {
        async theImagesAreDisplayedCorrectly() {
          const images = screen.getAllByRole('img') as HTMLImageElement[];
          expect(images).toHaveLength(4); // Two movies and two series
          expect(images[0].src).toContain(encodeURIComponent('/path/to/movie1.jpg'));
          expect(images[1].src).toContain(encodeURIComponent('/path/to/movie2.jpg'));
          expect(images[2].src).toContain(encodeURIComponent('/path/to/movie101.jpg'));
          expect(images[3].src).toContain(encodeURIComponent('/path/to/movie102.jpg'));
        },
        async theURLIsUpdatedWithQuery(query: string) {
          await waitFor(() => {
            const expectedURL = `?query=${query.replace(/ /g, '+')}`; // Replace spaces with "+"
            expect(pushMock).toHaveBeenCalledWith(expectedURL);
          });
        },
        async theURLIsNotUpdated() {
          await waitFor(() => {
            expect(pushMock).not.toHaveBeenCalled();
          });
        },
        async theModalDisplaysCorrectMediaDetails(index: number) {
          const modal = await waitFor(() => screen.getByTestId('modal'));
          expect(modal).toBeInTheDocument();

          const media = index < mockedMovies.data.length
          ? mockedMovies.data[index]
          : mockedSeries.data[index - mockedMovies.data.length];

          expect(modal).toHaveTextContent(media.title as string);
          expect(modal).toHaveTextContent(media.description as string);
          expect(modal).toHaveTextContent(media.releaseDate as string);
        },
      },
    };
  }
};

export type MediaSearchSut = ReturnType<ReturnType<typeof createMediaSearchSutBuilder>['build']>;
