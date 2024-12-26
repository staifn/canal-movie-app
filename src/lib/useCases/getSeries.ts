import { MediaResult } from "@/types/media.type";
import { fetchSeries } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";

export const getSeries = async (params = {}): Promise<MediaResult> => {
  const data = await fetchSeries(params);
  return mapSerieAPIToSerie(data);
};
