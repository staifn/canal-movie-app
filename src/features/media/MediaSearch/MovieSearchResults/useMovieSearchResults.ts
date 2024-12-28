import { useCallback, useEffect, useMemo, useState } from 'react';
import { Media, MediaResult } from "@/types/media.type";
import { searchMovies as searchMoviesUseCase } from '@/lib/useCases/searchMovies';
import { mergeUniqueItems } from '@/utils/mergeUniqueItems';
import { getMovies as getMoviesUseCase } from '@/lib/useCases/getMovies';
import { logError } from '@/utils/logError';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
};

interface UseMediaSearch {
  initialMovies: Omit<MediaResult, 'totalResults'>;
  searchValue: string;
}

export const useMovieSearchResults = ({ initialMovies, searchValue }: UseMediaSearch) => {
  const [movies, setMovies] = useState<Media[]>(initialMovies.data);
  const [moviesPage, setMoviesPage] = useState(initialMovies.page);

  const fetchMovies = useCallback(async (query: string | null, page: number) => {
    try {
      const params = query
        ? { ...commonQueryParams, page, query }
        : { ...commonQueryParams, page, include_null_first_air_dates: false, sort_by: 'popularity.desc' };

      const fetchFunction = query ? searchMoviesUseCase : getMoviesUseCase;
      const newMovies = await fetchFunction(params);

      setMovies((prevMovies) => mergeUniqueItems(prevMovies, newMovies.data));
    } catch (error) {
      logError(`"Failed to fetch series: "${error}`);
    }
  }, []);

  const handleReachEndOfMovieList = useCallback(() => {
    if (initialMovies.totalPages === moviesPage) return;

    const newPage = moviesPage + 1;
    fetchMovies(searchValue || null, newPage);
    setMoviesPage(newPage);
  }, [fetchMovies, initialMovies.totalPages, searchValue, moviesPage]);

  useEffect(() => {
    setMovies(initialMovies.data);
    setMoviesPage(initialMovies.page);
  }, [initialMovies]);

  return useMemo(() => ({
    handleReachEndOfMovieList,
    movies,
    moviesPage,
  }), [handleReachEndOfMovieList, movies, moviesPage]);
};
