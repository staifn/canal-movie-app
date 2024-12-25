export interface Serie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genres: string;
  rating: number;
  image: string;
};

export interface SerieAPI {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: 2457.826;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;

}

export interface SerieAPIResponse {
  page: number;
  results: SerieAPI[];
};
