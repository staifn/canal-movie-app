import { MovieAPIResponse } from "./movie.type";
import axiosInstance from "../axiosInstance";
import { logError } from "@/utils/logError";

export const fetchMovies = async (params = {}): Promise<MovieAPIResponse> => {
  try {
    const response = await axiosInstance.get('/movie', { params });
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};
