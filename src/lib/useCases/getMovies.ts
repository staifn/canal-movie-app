import { fetchMovies } from "../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../api/movie/movie.mapper";
import { Movie } from "../api/movie/movie.type";

export const getMovies = async (params = {}): Promise<Movie[]> => {
  const data = await fetchMovies(params);
  return data.results.map(mapMovieAPIToMovie);
};
