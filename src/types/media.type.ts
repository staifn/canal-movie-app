export interface Media {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genres: string;
  rating: number;
  image: string;
  voteCount: number;
};

export interface MediaResult {
  data: Media[];
  page: number;
  totalPages: number;
  totalResults: number;
};
