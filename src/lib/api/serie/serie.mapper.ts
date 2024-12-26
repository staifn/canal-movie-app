import { IMAGE_BASE_URL } from "@/config/config";
import { SerieAPIResponse } from "./serie.type";
import { MediaResult } from "@/types/media.type";

export const mapSerieAPIToSerie = (data: SerieAPIResponse): MediaResult => ({  
  data: data.results.map(serie => ({
    id: serie.id,
    title: serie.name,
    description: serie.overview,
    releaseDate: serie.first_air_date,
    genres: serie.genre_ids.join(', '),
    rating: serie.vote_average,
    image: serie.poster_path ? IMAGE_BASE_URL + serie.poster_path : '/images/netflix.svg',
    voteCount: serie.vote_count,
  })),  
  page: data.page,
  totalPages: data.total_pages,
  totalResults: data.total_results,
});
