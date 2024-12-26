import { fetchMovies } from "@/lib/api/movie/movie.api";
import { MediaResult } from "@/types/media.type";
import { mapMovieAPIToMovie } from "@/lib/api/movie/movie.mapper";
import { getMovies } from "./getMovies";

jest.mock("../../api/movie/movie.api");
jest.mock("../../api/movie/movie.mapper");

describe("getMovies", () => {
  it("should fetch movies and map them correctly", async () => {
    const mockAPIResponse = {
      results: [{ id: 1, name: "Movie 1" }],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    const mockMappedResult: MediaResult = {
      data: [{
        id: 1, title: "Movie 1", description: "A movie",
        releaseDate: "",
        genres: "",
        rating: 0,
        image: "",
        voteCount: 0
      }],
      page: 1,
      totalPages: 1,
      totalResults: 1,
    };

    (fetchMovies as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapMovieAPIToMovie as jest.Mock).mockReturnValue(mockMappedResult);

    const result = await getMovies({ page: 1 });

    expect(fetchMovies).toHaveBeenCalledWith({ page: 1 });
    expect(fetchMovies).toHaveBeenCalledTimes(1);
    expect(mapMovieAPIToMovie).toHaveBeenCalledWith(mockAPIResponse);
    expect(mapMovieAPIToMovie).toHaveBeenCalledTimes(1);
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

    (fetchMovies as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapMovieAPIToMovie as jest.Mock).mockReturnValue(mockMappedResult);

    const result = await getMovies();

    expect(fetchMovies).toHaveBeenCalledWith({});
    expect(result).toEqual(mockMappedResult);
  });
});
