import { fetchMovies, searchMovies } from "./movie.api";
import axiosInstance from "../axiosInstance";
import { logError } from "../../../utils/logError";
import { MovieAPIResponse } from "./movie.type";

jest.mock("../axiosInstance");
jest.mock("../../../utils/logError");

describe("movie.api", () => {
  const mockAPIResponse: MovieAPIResponse = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: "/backdrop.jpg",
        genre_ids: [28, 12],
        id: 123,
        original_language: "en",
        original_title: "Original Title",
        overview: "A brief description of the movie.",
        popularity: 1234.5,
        poster_path: "/poster.jpg",
        release_date: "2023-12-25",
        title: "Movie Title",
        video: false,
        vote_average: 8.7,
        vote_count: 3210,
      },
    ],
    total_pages: 1,
    total_results: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchMovies", () => {
    it("should fetch movies successfully", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockAPIResponse });

      const params = { sort_by: "popularity.desc" };
      const result = await fetchMovies(params);

      expect(axiosInstance.get).toHaveBeenCalledWith("/discover/movie", {
        params: {
          api_key: '12345',
          ...params,
        },
      });
      expect(result).toEqual(mockAPIResponse);
    });

    it("should log error and throw when request fails", async () => {
      const mockError = new Error("Network error");
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(fetchMovies()).rejects.toThrow(mockError);
      expect(logError).toHaveBeenCalledWith(mockError);
    });
  });

  describe("searchMovies", () => {
    it("should search movies successfully", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockAPIResponse });

      const params = { query: "test" };
      const result = await searchMovies(params);

      expect(axiosInstance.get).toHaveBeenCalledWith("/search/movie", {
        params: {
          api_key: '12345',
          ...params,
        },
      });
      expect(result).toEqual(mockAPIResponse);
    });

    it("should log error and throw when request fails", async () => {
      const mockError = new Error("Network error");
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(searchMovies()).rejects.toThrow(mockError);
      expect(logError).toHaveBeenCalledWith(mockError);
    });
  });
});
