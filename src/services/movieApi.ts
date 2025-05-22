
import { Movie, MovieDetails, MovieResponse } from "@/types/movie";

// This is the user's TMDB API key
const API_KEY = "7da51d3b59fc9bc4e1880d18852cffc1";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  
  return await response.json();
};

export const getTrendingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  
  return await response.json();
};

export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
  // Return empty results for very short queries
  if (query.trim().length < 2) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0
    };
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  );
  
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  
  return await response.json();
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  
  return await response.json();
};

export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "/placeholder.svg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
