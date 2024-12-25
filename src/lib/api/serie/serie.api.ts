import { SerieAPIResponse } from "./serie.type";
import axiosInstance from "../axiosInstance";
import { logError } from "@/utils/logError";

export const fetchSeries = async (params = {}): Promise<SerieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/tv', { params });
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};
