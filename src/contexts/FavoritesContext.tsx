"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { 
  getFavoriteMovies, 
  addFavoriteMovie, 
  removeFavoriteMovie, 
  isFavorite 
} from "@/services/favoritesService";
import { useToast } from "@/components/ui/use-toast";

interface FavoritesContextValue {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isMovieFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = getFavoriteMovies();
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (movie: Movie) => {
    addFavoriteMovie(movie);
    setFavorites(getFavoriteMovies());
    toast({
      title: "Added to favorites",
      description: `${movie.title} has been added to your favorites`,
    });
  };

  const removeFromFavorites = (movieId: number) => {
    removeFavoriteMovie(movieId);
    setFavorites(getFavoriteMovies());
    toast({
      title: "Removed from favorites",
      description: "Movie has been removed from your favorites",
    });
  };

  const isMovieFavorite = (movieId: number) => {
    return isFavorite(movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
