import { Movie } from "@/lib/api/movie/movie.type";

export type Media = Pick<Movie, 'id' | 'image'>;
