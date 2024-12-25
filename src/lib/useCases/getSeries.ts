import { fetchSeries } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";
import { SerieResult } from "../api/serie/serie.type";

export const getSeries = async (params = {}): Promise<SerieResult> => {
  const data = await fetchSeries(params);
  return mapSerieAPIToSerie(data);
};
