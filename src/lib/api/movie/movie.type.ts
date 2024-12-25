export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genres: string;
  rating: number;
  image: string;
};

export interface MovieResult {
  data: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
};

export interface MovieAPI {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: false,
  vote_average: number,
  vote_count: number,
}

export interface MovieAPIResponse {
  page: number;
  results: MovieAPI[];
  total_pages: number;
  total_results: number;
};
