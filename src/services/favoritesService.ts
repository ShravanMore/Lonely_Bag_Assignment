
import { Movie } from "@/types/movie";

const FAVORITES_KEY = "movie_explorer_favorites";

export const getFavoriteMovies = (): Movie[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const addFavoriteMovie = (movie: Movie): void => {
  const favorites = getFavoriteMovies();
  if (!favorites.some((fav) => fav.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavoriteMovie = (movieId: number): void => {
  const favorites = getFavoriteMovies();
  const updated = favorites.filter((movie) => movie.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavoriteMovies();
  return favorites.some((movie) => movie.id === movieId);
};
