
import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-movie-primary to-movie-secondary mb-2">
            My Favorites
          </h1>
          <p className="text-white/60 mb-8">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite movie${favorites.length > 1 ? "s" : ""}.`
              : "You haven't added any favorites yet."}
          </p>

          {favorites.length > 0 ? (
            <MovieGrid movies={favorites} isLoading={false} />
          ) : (
            <div className="text-center py-16 glass-morphism rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-3">No favorites yet</h2>
              <p className="text-white/60 mb-6">
                Start exploring and add movies to your favorites!
              </p>
              <a
                href="/"
                className="inline-block bg-movie-primary hover:bg-movie-secondary text-white px-6 py-2 rounded-md transition-colors"
              >
                Explore Movies
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
