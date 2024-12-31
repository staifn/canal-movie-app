import { SerieAPIResponse } from "./serie.type";
import axiosInstance from "../axiosInstance";
import { logError } from "@/utils/logError";
import { API_KEY } from "@/config/config";

export const fetchSeries = async (params: Record<string, unknown> = {}): Promise<SerieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/discover/tv', {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    logError(error);
    throw new Error("Failed to fetch series. Please try again later.");
  }
};

export const searchSeries = async (params: Record<string, unknown> = {}): Promise<SerieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/search/tv', {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    logError(error);
    throw new Error("Failed to search series. Please try again later.");
  }
};
