'use client';

import { MediaResult } from "@/types/media.type";
import { useMediaSearch } from './useMediaSearch';
import { MovieSearchResults } from "../MovieSearchResults/MovieSearchResults";
import { SerieSearchResults } from "../SerieSearchResults/SerieSearchResults";

interface MediaSearchProps {
  movies: MediaResult;
  series: MediaResult;
}

export const MediaSearch = ({ movies, series }: MediaSearchProps) => {
  const {
    inputValue,
    setInputValue
  } = useMediaSearch()

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Recherchez..."
      />
      <MovieSearchResults movies={movies} inputValue={inputValue} />
      <SerieSearchResults series={series} inputValue={inputValue} />
    </>
  );
}
