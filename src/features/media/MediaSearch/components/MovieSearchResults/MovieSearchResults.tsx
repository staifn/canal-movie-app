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
    items,
    page,
    handleReachEndOfList,
  } = useMovieSearchResults({ initialMovies, searchValue })

  return (
      <CardList mediaList={items} title='Movies' onReachEndOfList={handleReachEndOfList} page={page} />
  );
}

