import { searchSeries } from "./searchSeries";
import { searchSeries as searchSeriesApi } from "../../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../../api/serie/serie.mapper";
import { MediaResult } from "@/types/media.type";

jest.mock("../../api/serie/serie.api");
jest.mock("../../api/serie/serie.mapper");

describe("searchSeries", () => {
  it("should call searchSeriesApi and map the result correctly", async () => {
    // Mocked API response
    const mockAPIResponse = {
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
        },
      ],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    // Mocked mapped response
    const mockMappedResult: MediaResult = {
      data: [
        {
          id: 1,
          title: "Serie 1",
          description: "Description of Serie 1",
          releaseDate: "2023-01-01",
          genres: "18, 35",
          rating: 8.5,
          image: "/poster1.jpg",
          voteCount: 100,
        },
      ],
      page: 1,
      totalPages: 1,
      totalResults: 1,
    };

    // Mock the API and mapper
    (searchSeriesApi as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapSerieAPIToSerie as jest.Mock).mockReturnValue(mockMappedResult);

    // Call the function
    const result = await searchSeries({ query: "test" });

    // Assertions
    expect(searchSeriesApi).toHaveBeenCalledWith({ query: "test" });
    expect(searchSeriesApi).toHaveBeenCalledTimes(1);
    expect(mapSerieAPIToSerie).toHaveBeenCalledWith(mockAPIResponse);
    expect(mapSerieAPIToSerie).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockMappedResult);
  });

  it("should handle empty params", async () => {
    const mockAPIResponse = {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    };

    const mockMappedResult: MediaResult = {
      data: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    };

    (searchSeriesApi as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapSerieAPIToSerie as jest.Mock).mockReturnValue(mockMappedResult);

    const result = await searchSeries();

    expect(searchSeriesApi).toHaveBeenCalledWith({});
    expect(result).toEqual(mockMappedResult);
  });
});
