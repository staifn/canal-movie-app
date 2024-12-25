export type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genres: string;
  rating: number;
  image: string;
};

export type MovieAPI = {
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

export type MovieAPIResponse = {
  page: number,
  results: MovieAPI[]
};
