export interface SerieAPI {
  adult: boolean | null;
  backdrop_path: string | null;
  genre_ids: number[] | null;
  id: number;
  origin_country: string[] | null;
  original_language: string | null;
  original_name: string | null;
  overview: string | null;
  popularity: number | null;
  poster_path: string | null;
  first_air_date: string | null;
  name: string | null;
  vote_average: number | null;
  vote_count: number | null;

}

export interface SerieAPIResponse {
  page: number;
  results: SerieAPI[];
  total_pages: number;
  total_results: number;
};
