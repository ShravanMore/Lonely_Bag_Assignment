
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length > 0,
    retry: 1,
  });

  useEffect(() => {
    if (!data) return;
    
    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies((prev) => [...prev, ...data.results]);
    }
    
    setHasMore(page < data.total_pages);
  }, [data, page]);

  useEffect(() => {
    // Reset when query changes
    setPage(1);
    setMovies([]);
  }, [query]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load search results. Please try again later.",
        variant: "destructive",
      });
      console.error("Search API error:", error);
    }
  }, [error, toast]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results
          </h1>
          <p className="text-white/60 mb-8">
            {query ? (
              <>
                Showing results for: <span className="text-movie-primary">"{query}"</span>
                {data && ` (${data.total_results} results)`}
              </>
            ) : (
              "Please enter a search query"
            )}
          </p>

          {query ? (
            <>
              <MovieGrid movies={movies} isLoading={isLoading} />
              
              {movies.length === 0 && !isLoading && !error && (
                <div className="text-center py-12">
                  <p className="text-white/60">No movies found for "{query}"</p>
                </div>
              )}

              {error && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-white/60 mb-4">Failed to load search results</p>
                  <Button onClick={handleRetry} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMore} 
                    disabled={isFetching}
                    className="bg-movie-primary hover:bg-movie-secondary"
                  >
                    {isFetching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60">Enter a search term to find movies</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
