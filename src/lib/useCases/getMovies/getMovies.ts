import { fetchMovies } from "@/lib/api/movie/movie.api";
import { mapMovieAPIToMovie } from "@/lib/api/movie/movie.mapper";
import { MediaResult } from "@/types/media.type";

export const getMovies = async (params = {}): Promise<MediaResult> => {
  const data = await fetchMovies(params);
  return mapMovieAPIToMovie(data);
};
