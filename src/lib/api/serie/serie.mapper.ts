import { IMAGE_BASE_URL } from "@/config/config";
import { SerieAPIResponse, SerieResult } from "./serie.type";

export const mapSerieAPIToSerie = (data: SerieAPIResponse): SerieResult => ({  
  data: data.results.map(serie => ({
    id: serie.id,
    title: serie.name,
    description: serie.overview,
    releaseDate: serie.first_air_date,
    genres: serie.genre_ids.join(', '),
    rating: serie.vote_average,
    image: IMAGE_BASE_URL + serie.poster_path
  })),  
  page: data.page,
  totalPages: data.total_pages,
  totalResults: data.total_results,
});
