import { MediaResult } from "@/types/media.type";
import { searchMovies as searchMoviesApi } from "../../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../../api/movie/movie.mapper";

export const searchMovies = async (params = {}): Promise<MediaResult> => {
  const data = await searchMoviesApi(params);
  return mapMovieAPIToMovie(data);
};
