'use client';

import { Media } from "@/types/media.type";
import { CardList } from "../CardList/CardList";
import { useMediaSearch } from './useMediaSearch';

interface MediaSearchProps {
  movies: Media[];
  series: Media[];
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
      {movies.length ? <CardList mediaList={movies} title='Movies' /> : null}
      {series.length ? <CardList mediaList={series} title='Series' /> : null}
    </>
  );
}
