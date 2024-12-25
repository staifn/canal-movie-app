import { fetchSeries } from "../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../api/serie/serie.mapper";
import { Serie } from "../api/serie/serie.type";

export const getSeries = async (params = {}): Promise<Serie[]> => {
  const data = await fetchSeries(params);
  console.log('data.results', data.results)
  return data.results.map(mapSerieAPIToSerie);
};
