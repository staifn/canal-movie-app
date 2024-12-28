import { MovieAPIResponse } from "./movie.type";
import axiosInstance from "../axiosInstance";
import { logError } from "@/utils/logError";
import { API_KEY } from "@/config/config";

export const fetchMovies = async (params: Record<string, unknown>): Promise<MovieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/discover/movie', {
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

export const searchMovies = async (params: Record<string, unknown>): Promise<MovieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/search/movie', {
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
