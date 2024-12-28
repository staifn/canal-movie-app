'use client';

import { MediaResult } from "@/types/media.type";
import { useMediaSearch } from './useMediaSearch';
import { MovieSearchResults, SerieSearchResults } from "../components";

interface MediaSearchProps {
  movies: MediaResult;
  series: MediaResult;
}

export const MediaSearch = ({ movies, series }: MediaSearchProps) => {
  const {
    searchValue,
    setSearchValue
  } = useMediaSearch()

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Recherchez..."
      />
      <MovieSearchResults movies={movies} searchValue={searchValue} />
      <SerieSearchResults series={series} searchValue={searchValue} />
    </>
  );
}
