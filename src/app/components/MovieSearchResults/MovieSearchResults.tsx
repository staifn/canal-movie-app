import { MediaResult } from "@/types/media.type";
import { CardList } from "../CardList/CardList";
import { useMovieSearchResults } from "./useMovieSearchResults";

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

