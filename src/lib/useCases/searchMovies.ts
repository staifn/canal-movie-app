import { searchMovies as searchMoviesApi } from "../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../api/movie/movie.mapper";
import { MovieResult } from "../api/movie/movie.type";

export const searchMovies = async (params = {}): Promise<MovieResult> => {
  const data = await searchMoviesApi(params);
  return mapMovieAPIToMovie(data);
};
