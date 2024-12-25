import { IMAGE_BASE_URL } from "@/config/config";
import { Serie, SerieAPI } from "./serie.type";

export const mapSerieAPIToSerie = (data: SerieAPI): Serie => ({
  id: data.id,
  title: data.name,
  description: data.overview,
  releaseDate: data.first_air_date,
  genres: data.genre_ids.join(', '),
  rating: data.vote_average,
  image: IMAGE_BASE_URL + data.poster_path
});
