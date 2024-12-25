import { searchMovies as searchMoviesApi } from "../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../api/movie/movie.mapper";
import { Movie } from "../api/movie/movie.type";

export const searchMovies = async (params = {}): Promise<Movie[]> => {
  const data = await searchMoviesApi(params);
  return data.results.map(mapMovieAPIToMovie);
};
