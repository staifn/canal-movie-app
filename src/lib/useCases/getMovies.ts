import { fetchMovies } from "../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../api/movie/movie.mapper";
import { MovieResult } from "../api/movie/movie.type";

export const getMovies = async (params = {}): Promise<MovieResult> => {
  const data = await fetchMovies(params);
  return mapMovieAPIToMovie(data);
};
