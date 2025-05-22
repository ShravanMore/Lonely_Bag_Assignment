import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/services/movieApi";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useFavorites();
  const isFavorite = isMovieFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="relative rounded-lg overflow-hidden group card-hover">
        <div className="aspect-[2/3] w-full">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold line-clamp-2">{movie.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="bg-movie-primary/80 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                {movie.vote_average.toFixed(1)}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="p-0 h-8 w-8 rounded-full"
                onClick={toggleFavorite}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
