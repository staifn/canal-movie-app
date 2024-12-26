import { searchMovies } from "./searchMovies";
import { searchMovies as searchMoviesApi } from "../../api/movie/movie.api";
import { mapMovieAPIToMovie } from "../../api/movie/movie.mapper";
import { MediaResult } from "@/types/media.type";

jest.mock("../../api/movie/movie.api");
jest.mock("../../api/movie/movie.mapper");

describe("searchMovies", () => {
  it("should call searchMoviesApi and map the result correctly", async () => {
    // Mocked API response
    const mockAPIResponse = {
      results: [
        {
          id: 1,
          title: "Movie 1",
          overview: "A movie description",
          release_date: "2023-01-01",
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
          title: "Movie 1",
          description: "A movie description",
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
    (searchMoviesApi as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapMovieAPIToMovie as jest.Mock).mockReturnValue(mockMappedResult);

    // Call the function
    const result = await searchMovies({ query: "test" });

    // Assertions
    expect(searchMoviesApi).toHaveBeenCalledWith({ query: "test" });
    expect(searchMoviesApi).toHaveBeenCalledTimes(1);
    expect(mapMovieAPIToMovie).toHaveBeenCalledWith(mockAPIResponse);
    expect(mapMovieAPIToMovie).toHaveBeenCalledTimes(1);
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

    (searchMoviesApi as jest.Mock).mockResolvedValue(mockAPIResponse);
    (mapMovieAPIToMovie as jest.Mock).mockReturnValue(mockMappedResult);

    const result = await searchMovies();

    expect(searchMoviesApi).toHaveBeenCalledWith({});
    expect(result).toEqual(mockMappedResult);
  });
});
