import { searchMovies } from "@/lib/useCases/searchMovies";
import { MediaSearch } from "../MediaSearch/MediaSearch";
import { getMovies } from "@/lib/useCases/getMovies";
import { getSeries } from "@/lib/useCases/getSeries";
import { searchSeries } from "@/lib/useCases/searchSeries";

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
  page: 1,
};

interface MediaSearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function MediaSearchSSR({ searchParams }: MediaSearchProps) {
  const query = (await searchParams).query || '';

  const movieQueryParams = {
    ...commonQueryParams,
    include_video: false,
    sort_by: 'popularity.desc',
  };
  
  const serieQueryParams = {
    ...commonQueryParams,
    include_null_first_air_dates: false,
    sort_by: 'popularity.desc',
  };

  const searchQueryParams = {
    ...commonQueryParams,
    query,
  }  

  const movies = await (query ? searchMovies(searchQueryParams) : getMovies(movieQueryParams));
  const series = await  (query ? searchSeries(searchQueryParams) : getSeries(serieQueryParams));

  return <MediaSearch movies={movies} series={series} />
}
