
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, getTrendingMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";
import { useToast } from "@/components/ui/use-toast";

const Index: React.FC = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const trendingQuery = useQuery({
    queryKey: ["trending", page],
    queryFn: () => getTrendingMovies(page),
    retry: 2,
  });

  useEffect(() => {
    if (!trendingQuery.data) return;

    setTrending((prev) => [...prev, ...trendingQuery.data.results]);
    setHasMore(page < trendingQuery.data.total_pages);
  }, [trendingQuery.data, page]);

  useEffect(() => {
    if (trendingQuery.error) {
      toast({
        title: "Error",
        description: "Failed to load movies. Please try again later.",
        variant: "destructive",
      });
    }
  }, [trendingQuery.error, toast]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !trendingQuery.isFetching) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, trendingQuery.isFetching]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-movie-primary to-movie-secondary mb-8">
            Trending Movies
          </h1>
          <MovieGrid movies={trending} isLoading={trendingQuery.isLoading} />
          {(trendingQuery.isFetching || hasMore) && (
            <div
              ref={loadingRef}
              className="flex justify-center items-center h-20 mt-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-movie-primary"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
