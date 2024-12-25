import { searchSeries as searchSeriesApi } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";
import { SerieResult } from "../api/serie/serie.type";

export const searchSeries = async (params = {}): Promise<SerieResult> => {
  const data = await searchSeriesApi(params);
  return mapSerieAPIToSerie(data);
};
