export interface Media {
  id: number;
  title: string | null;
  description: string | null;
  releaseDate: string | null;
  genres: string | null;
  rating: number | null;
  image: string;
  voteCount: number | null;
};

export interface MediaResult {
  data: Media[];
  page: number;
  totalPages: number;
  totalResults: number;
};
