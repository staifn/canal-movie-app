'use client';

import { CardList } from "../CardList/CardList";
import { useMediaSearch } from './useMediaSearch';
import { MovieResult } from "@/lib/api/movie/movie.type";
import { SerieResult } from "@/lib/api/serie/serie.type";

interface MediaSearchProps {
  movies: MovieResult;
  series: SerieResult;
}

export const MediaSearch = ({ movies, series }: MediaSearchProps) => {
  const {
    inputValue,
    filteredMovies,
    filteredSeries,
    moviesPage,
    seriesPage,
    handleReachEndOfMovieList,
    handleReachEndOfSerieList,
    setInputValue
  } = useMediaSearch({ movies, series })

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Recherchez..."
      />
      {filteredMovies.length ? <CardList mediaList={filteredMovies} title='Movies' onReachEndOfList={handleReachEndOfMovieList} page={moviesPage} /> : null}
      {filteredSeries.length ? <CardList mediaList={filteredSeries} title='Series' onReachEndOfList={handleReachEndOfSerieList} page={seriesPage} /> : null}
    </>
  );
}
