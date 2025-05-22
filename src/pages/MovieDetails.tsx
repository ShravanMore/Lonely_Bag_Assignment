import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { getMovieDetails, getImageUrl } from "@/services/movieApi";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || "0", 10);
  const { isMovieFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();
  
  const isFavorite = isMovieFavorite(movieId);
  
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });
  
  const toggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-movie-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Movie Not Found</h1>
            <p className="text-white/60 mt-4">Sorry, we couldn't find the movie you're looking for.</p>
          </div>
        </div>
      </div>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div 
        className="relative w-full h-[50vh] bg-cover bg-center" 
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(26, 31, 44, 0.2), rgba(26, 31, 44, 1)), url(${getImageUrl(movie.backdrop_path, "original")})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-movie-dark via-movie-dark/80 to-transparent"></div>
      </div>
      
      <main className="container relative -mt-40 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="md:col-span-8 lg:col-span-9">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {movie.title} <span className="text-white/60">({releaseYear})</span>
            </h1>
            
            {movie.tagline && (
              <p className="mt-2 text-movie-primary italic">"{movie.tagline}"</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="bg-movie-primary/80 text-white font-medium px-3 py-1 rounded">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              
              <span className="text-white/80">
                {movie.runtime} min
              </span>
              
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-white/10 text-white/90 px-3 py-1 rounded text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            <Button
              onClick={toggleFavorite}
              className={`mt-6 ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-white/10 hover:bg-white/20"}`}
            >
              <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-white" : ""}`} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            
            <Separator className="my-6 bg-white/20" />
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-white/80 leading-relaxed">{movie.overview}</p>
            </div>
            
            <Separator className="my-6 bg-white/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Details</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-white/60">Status</span>
                    <span className="text-white">{movie.status}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Release Date</span>
                    <span className="text-white">{movie.release_date}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Vote Count</span>
                    <span className="text-white">{movie.vote_count.toLocaleString()}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Production</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {movie.production_companies.slice(0, 4).map((company) => (
                    <div key={company.id} className="flex items-center justify-center bg-white/5 rounded-lg p-4 min-h-[60px]">
                      {company.logo_path ? (
                        <img 
                          src={getImageUrl(company.logo_path, "w200")} 
                          alt={company.name} 
                          className="max-h-[40px] max-w-[100px] object-contain"
                        />
                      ) : (
                        <span className="text-white/60 text-sm">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
