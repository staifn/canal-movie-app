import { searchSeries as searchSeriesApi } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";
import { Movie } from "../api/movie/movie.type";

export const searchSeries = async (params = {}): Promise<Movie[]> => {
  const data = await searchSeriesApi(params);
  return data.results.map(mapSerieAPIToSerie);
};
