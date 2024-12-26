import { MediaResult } from "@/types/media.type";
import { searchSeries as searchSeriesApi } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";

export const searchSeries = async (params = {}): Promise<MediaResult> => {
  const data = await searchSeriesApi(params);
  return mapSerieAPIToSerie(data);
};
