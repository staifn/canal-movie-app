import { useCallback, useEffect, useMemo, useState } from 'react';
import { Media, MediaResult } from "@/types/media.type";
import { searchMovies as searchMoviesUseCase } from '@/lib/useCases/searchMovies';
import { mergeUniqueItems } from '@/utils/mergeUniqueItems';
import { getMovies as getMoviesUseCase } from '@/lib/useCases/getMovies';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
  page: 1,
};
interface UseMediaSearch {
  initialMovies: MediaResult;
  inputValue: string;
}

export const useMovieSearchResults = ({ initialMovies, inputValue }: UseMediaSearch) => {
  const [movies, setMovies] = useState<Media[]>(initialMovies.data);
  const [moviesPage, setMoviesPage] = useState(initialMovies.page);

  const searchMovies = useCallback(async (movies: Media[], query: string, page: number) => {
    const moviesQueryParams = {
      include_adult: false,
      language,
      page,
      query,
    };

    const newMovies = await searchMoviesUseCase(moviesQueryParams);
    setMovies(mergeUniqueItems(movies, newMovies.data));
  }, []); 


  const getMovies = useCallback(async (movies: Media[], page: number) => {
    const moviesQueryParams = {
      ...commonQueryParams,
      include_null_first_air_dates: false,
      sort_by: 'popularity.desc',
      page,
    };

    const newMovies = await getMoviesUseCase(moviesQueryParams);
    setMovies(mergeUniqueItems(movies, newMovies.data));
  }, []); 


  const handleReachEndOfMovieList = useCallback(() => {    
    if (initialMovies.totalPages === moviesPage) return;
    const newPage = moviesPage + 1;

    if (inputValue) {
      searchMovies(movies, inputValue, newPage)
    }  else {
      getMovies(movies, newPage);
    }
    setMoviesPage(newPage);
  }, [inputValue, getMovies, initialMovies.totalPages, movies, moviesPage, searchMovies]);

  useEffect(() => {
    setMovies(initialMovies.data);
    setMoviesPage(initialMovies.page);
  }, [initialMovies]);

  console.log('movies', movies)

  return useMemo(() => ({
    handleReachEndOfMovieList,
    moviesPage,
    movies,
  }), [handleReachEndOfMovieList, movies, moviesPage]);
};
