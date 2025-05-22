import React from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        : movies.map((movie, idx) => <MovieCard key={`${movie.id}-${idx}`} movie={movie} />)}
    </div>
  );
};

export default MovieGrid;
