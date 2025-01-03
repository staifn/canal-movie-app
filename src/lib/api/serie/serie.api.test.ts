import { logError } from "../../../utils/logError";
import axiosInstance from "../axiosInstance";
import { fetchSeries, searchSeries } from "./serie.api";
import { SerieAPIResponse } from "./serie.type";

jest.mock("../axiosInstance");
jest.mock("../../../utils/logError");

describe("serie.api", () => {
  const mockAPIResponse: SerieAPIResponse = {
    page: 1,
    results: [
      {
        id: 1,
        name: "Serie 1",
        overview: "Description of Serie 1",
        first_air_date: "2023-01-01",
        genre_ids: [18, 35],
        vote_average: 8.5,
        poster_path: "/poster1.jpg",
        vote_count: 100,
        adult: false,
        backdrop_path: "/backdrop1.jpg",
        original_language: "en",
        original_name: "Original Serie 1",
        popularity: 123.4,
        origin_country: ["US"],
      },
    ],
    total_pages: 1,
    total_results: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchSeries", () => {
    it("should fetch series successfully", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockAPIResponse });

      const params = { sort_by: "popularity.desc" };
      const result = await fetchSeries(params);

      expect(axiosInstance.get).toHaveBeenCalledWith("/discover/tv", {
        params: {
          api_key: "12345",
          ...params,
        },
      });
      expect(result).toEqual(mockAPIResponse);
    });

    it("should log error and throw when request fails", async () => {
      const mockError = new Error("Failed to fetch series. Please try again later.");
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(fetchSeries()).rejects.toThrow(mockError);
      expect(logError).toHaveBeenCalledWith(mockError);
    });
  });

  describe("searchSeries", () => {
    it("should search series successfully", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockAPIResponse });

      const params = { query: "test" };
      const result = await searchSeries(params);

      expect(axiosInstance.get).toHaveBeenCalledWith("/search/tv", {
        params: {
          api_key: "12345",
          ...params,
        },
      });
      expect(result).toEqual(mockAPIResponse);
    });

    it("should log error and throw when request fails", async () => {
      const mockError = new Error("Failed to search series. Please try again later.");
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(searchSeries()).rejects.toThrow(mockError);
      expect(logError).toHaveBeenCalledWith(mockError);
    });
  });
});
