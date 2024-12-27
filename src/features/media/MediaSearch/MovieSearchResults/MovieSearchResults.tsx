'use client'

import { MediaResult } from "@/types/media.type";
import { useMovieSearchResults } from "./useMovieSearchResults";
import { CardList } from "@/components/CardList";

interface MovieSearchResultsProps {
  movies: MediaResult;
  inputValue: string;
}

export const MovieSearchResults = ({ movies: initialMovies, inputValue }: MovieSearchResultsProps) => {
  const {
    movies,
    moviesPage,
    handleReachEndOfMovieList,
  } = useMovieSearchResults({ initialMovies, inputValue })

  return (
      <CardList mediaList={movies} title='Movies' onReachEndOfList={handleReachEndOfMovieList} page={moviesPage} />
  );
}

