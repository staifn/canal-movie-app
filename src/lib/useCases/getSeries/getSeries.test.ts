import { getSeries } from "./getSeries";
import { fetchSeries } from "../../api/serie/serie.api";
import { mapSerieAPIToSerie } from "../../api/serie/serie.mapper";
import { MediaResult } from "@/types/media.type";

jest.mock("../../api/serie/serie.api");
jest.mock("../../api/serie/serie.mapper");

describe("getSeries", () => {
  it("should fetch series and map them correctly", async () => {
    // Mocked response from fetchSeries
    const mockAPIResponse = {
      results: [{ id: 1, name: "Serie 1" }],
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
          description: "A serie",
          releaseDate: "2023",
          genres: "Drama",
          rating: 8.5,
          voteCount: 100,
          image: ""
        },
      ],
      page: 1,
      totalPages: 1,
      totalResults: 1,
    };

    // Mock fetchSeries and mapSerieAPIToSerie
    (fetchSeries as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapSerieAPIToSerie as jest.Mock).mockReturnValue(mockMappedResult);

    // Call the function
    const result = await getSeries({ page: 1 });

    // Assertions
    expect(fetchSeries).toHaveBeenCalledWith({ page: 1 });
    expect(fetchSeries).toHaveBeenCalledTimes(1);
    expect(mapSerieAPIToSerie).toHaveBeenCalledWith(mockAPIResponse);
    expect(mapSerieAPIToSerie).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockMappedResult);
  });

  it("should handle empty params and fetch data", async () => {
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

    (fetchSeries as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapSerieAPIToSerie as jest.Mock).mockReturnValue(mockMappedResult);

    const result = await getSeries();

    expect(fetchSeries).toHaveBeenCalledWith({});
    expect(result).toEqual(mockMappedResult);
  });
});
