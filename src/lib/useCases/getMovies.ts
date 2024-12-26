import { MediaResult } from "@/types/media.type";
import { fetchMovies } from "../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../api/movie/movie.mapper";

export const getMovies = async (params = {}): Promise<MediaResult> => {
  const data = await fetchMovies(params);
  return mapMovieAPIToMovie(data);
};
