import { getMovies as getMoviesUseCase } from '@/lib/useCases/getMovies';
import { searchMovies as searchMoviesUseCase } from '@/lib/useCases/searchMovies';
import { MediaResult } from '@/types/media.type';
import { useMediaSearchResults } from '../../hooks/useMediaSearchResults';

interface MovieQueryParams extends Record<string, unknown> {
  include_adult: boolean;
  language: string;
  page: number;
  query?: string;
  sort_by?: string;
}

export const useMovieSearchResults = ({
  initialMovies,
  searchValue,
}: {
  initialMovies: Omit<MediaResult, 'totalResults'>;
  searchValue: string;
}) => {
  return useMediaSearchResults<MovieQueryParams>({
    initialData: initialMovies,
    searchValue,
    searchUseCase: searchMoviesUseCase,
    getUseCase: getMoviesUseCase,
    additionalQueryParams: {
      sort_by: 'popularity.desc',
    },
  });
};
