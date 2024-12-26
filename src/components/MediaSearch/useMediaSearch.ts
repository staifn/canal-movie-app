import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Media, MediaResult } from "@/types/media.type";
import { searchMovies } from '@/lib/useCases/searchMovies';
import { searchSeries } from '@/lib/useCases/searchSeries';

const language = 'en-US';
interface UseMediaSearch {
  movies: MediaResult;
  series: MediaResult;
}

export const useMediaSearch = ({ movies: initialMovies, series: initialSeries }: UseMediaSearch) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [movies, setMovies] = useState<Media[]>(initialMovies.data);
  const [series, setSeries] = useState<Media[]>(initialSeries.data);
  const [moviesPage, setMoviesPage] = useState(initialMovies.page);
  const [seriesPage, setSeriesPage] = useState(initialSeries.page);

  useEffect(() => {
    setMovies(initialMovies.data);
    setMoviesPage(initialMovies.page);
  }, [initialMovies]);

  useEffect(() => {
    setSeries(initialSeries.data);
    setSeriesPage(initialSeries.page);
  }, [initialSeries]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    if (queryParam === debouncedValue) return;
  
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('query', debouncedValue);
    router.push(`?${newParams.toString()}`);
  }, [debouncedValue, router, searchParams]);

  const handleSearchMovies = useCallback(async (movies: Media[], query: string, page: number) => {
    const moviesQueryParams = {
      include_adult: false,
      language,
      page,
      query,
    };

    const newMovies = await searchMovies(moviesQueryParams);
    setMovies([
      ...movies,
      ...newMovies.data,
    ]);
  }, []); 

  const handleSearchSeries = useCallback(async (movies: Media[], query: string, page: number) => {
    const seriesQueryParams = {
      include_adult: false,
      language,
      page,
      query,
    };

    const newMovies = await searchSeries(seriesQueryParams);
    setSeries([
      ...movies,
      ...newMovies.data,
    ]);
  }, []);  

  const handleReachEndOfMovieList = useCallback(() => {    
    if (initialMovies.totalPages === moviesPage) return;
    setMoviesPage(moviesPage + 1);
    handleSearchMovies(movies, debouncedValue, moviesPage + 1);
  }, [debouncedValue, handleSearchMovies, initialMovies.totalPages, movies, moviesPage]);

  const handleReachEndOfSerieList = useCallback(() => {    
    if (initialSeries.totalPages === seriesPage) return;
    setSeriesPage(seriesPage + 1);
    handleSearchSeries(series, debouncedValue, seriesPage + 1);
  }, [debouncedValue, handleSearchSeries, initialSeries.totalPages, series, seriesPage]);

  return useMemo(() => ({
    setInputValue,
    handleReachEndOfMovieList,
    handleReachEndOfSerieList,
    inputValue,
    moviesPage,
    seriesPage,
    filteredMovies: movies,
    filteredSeries: series,
  }), [handleReachEndOfMovieList, handleReachEndOfSerieList, inputValue, movies, moviesPage, series, seriesPage]);
};
