import { SerieAPIResponse } from "./serie.type";
import axiosInstance from "../axiosInstance";
import { logError } from "@/utils/logError";
import { API_KEY } from "@/config/config";

export const fetchSeries = async (params = {}): Promise<SerieAPIResponse> => {
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
    throw error;
  }
};

export const searchSeries = async (params = {}): Promise<SerieAPIResponse> => {
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
    throw error;
  }
};
