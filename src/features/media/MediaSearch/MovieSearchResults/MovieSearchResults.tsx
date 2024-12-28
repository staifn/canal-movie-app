'use client'

import { MediaResult } from "@/types/media.type";
import { useMovieSearchResults } from "./useMovieSearchResults";
import { CardList } from "@/components/CardList";

interface MovieSearchResultsProps {
  movies: MediaResult;
  searchValue: string;
}

export const MovieSearchResults = ({ movies: initialMovies, searchValue }: MovieSearchResultsProps) => {
  const {
    movies,
    moviesPage,
    handleReachEndOfMovieList,
  } = useMovieSearchResults({ initialMovies, searchValue })

  return (
      <CardList mediaList={movies} title='Movies' onReachEndOfList={handleReachEndOfMovieList} page={moviesPage} />
  );
}

