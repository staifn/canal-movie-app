import { IMAGE_BASE_URL } from "@/config/config";
import { Movie, MovieAPI } from "./movie.type";

export const mapMovieAPIToMovie = (data: MovieAPI): Movie => ({
  id: data.id,
  title: data.title,
  description: data.overview,
  releaseDate: data.release_date,
  genres: data.genre_ids.join(', '),
  rating: data.vote_average,
  image: IMAGE_BASE_URL + data.poster_path
});
