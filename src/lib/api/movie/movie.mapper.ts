import { MovieAPIResponse } from "./movie.type";
import { MediaResult } from "@/types/media.type";
import { setImage } from "@/utils/setImage";

export const mapMovieAPIToMovie = (data: MovieAPIResponse): MediaResult => ({
  data: data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    genres: movie.genre_ids.join(', '),
    rating: movie.vote_average,
    image: setImage(movie.poster_path),
    voteCount: movie.vote_count,
  })),  
  page: data.page,
  totalPages: data.total_pages,
  totalResults: data.total_results,
});
