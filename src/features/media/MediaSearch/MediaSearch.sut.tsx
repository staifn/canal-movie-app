import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MediaSearch } from './MediaSearch';
import { useMediaSearch } from './useMediaSearch';

jest.mock('./useMediaSearch', () => ({
  useMediaSearch: jest.fn(),
}));

const mockedMovies = {
  data: [
    { id: 1, title: 'Movie 1', description: 'Description for Movie 1', releaseDate: '2023-01-01', genres: 'Action', rating: 4.5, image: '/path/to/movie1.jpg', voteCount: 1500 },
    { id: 2, title: 'Movie 2', description: 'Description for Movie 2', releaseDate: '2023-02-01', genres: 'Comedy', rating: 4.0, image: '/path/to/movie2.jpg', voteCount: 1200 },
  ],
  page: 1,
  totalPages: 1,
  totalResults: 2,
};

const mockedSeries = {
  data: [
    { id: 101, title: 'Movie 101', description: 'Description for Movie 101', releaseDate: '2022-01-01', genres: 'Drama', rating: 5.0, image: '/path/to/movie101.jpg', voteCount: 2000 },
    { id: 102, title: 'Movie 102', description: 'Description for Movie 102', releaseDate: '2022-02-01', genres: 'Sci-Fi', rating: 4.8, image: '/path/to/movie102.jpg', voteCount: 1800 },
  ],
  page: 1,
  totalPages: 1,
  totalResults: 2,
};

export const createMediaSearchSutBuilder = () => {
  return {
    build,
  };

  function build() {
    const mockSetInputValue = jest.fn();
    jest.mocked(useMediaSearch).mockReturnValue({
      inputValue: '',
      setInputValue: mockSetInputValue,
    });

    return {
      given: {
        moviesAndSeriesAreProvided() {
          const utils = render(<MediaSearch movies={mockedMovies} series={mockedSeries} />);
          return {
            cleanup: utils.unmount,
          };
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
      },
    };
  }
};

export type MediaSearchSut = ReturnType<ReturnType<typeof createMediaSearchSutBuilder>['build']>;
