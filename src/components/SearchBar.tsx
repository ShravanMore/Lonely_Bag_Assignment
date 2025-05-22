import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/services/movieApi";
import { Skeleton } from "./ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search query
  const { data, isLoading } = useQuery({
    queryKey: ["searchSuggestions", debouncedSearchTerm],
    queryFn: () => searchMovies(debouncedSearchTerm, 1),
    enabled: debouncedSearchTerm.length > 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filter results to limited count for suggestions
  const searchResults = data?.results?.slice(0, 5) || [];

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.length > 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          type="search"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => handleSearchInput(e.target.value)}
          onFocus={() => searchQuery.length > 1 && setIsOpen(true)}
          className="pl-9 pr-8 w-[200px] lg:w-[300px] h-9 rounded-md bg-white/10 text-sm text-white border-none focus:ring-1 focus:ring-movie-primary"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4 text-white/50 hover:text-white" />
          </button>
        )}
      </form>

      {/* Dynamic search results */}
      {isOpen && (
        <div className="absolute top-full mt-1 z-50 w-full">
          <Command className="rounded-lg border border-white/10 bg-movie-dark/95 shadow-xl">
            <CommandList>
              {isLoading ? (
                <div className="p-2 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-12 w-8 rounded" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <CommandGroup heading="Movies">
                      {searchResults.map((movie) => (
                        <CommandItem
                          key={movie.id}
                          onSelect={() => handleSelectMovie(movie)}
                          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white/10"
                        >
                          <div className="h-12 w-8 flex-shrink-0 overflow-hidden rounded">
                            <img
                              src={getImageUrl(movie.poster_path, "w92")}
                              alt={movie.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">{movie.title}</p>
                            <p className="text-xs text-white/60">
                              {movie.release_date?.substring(0, 4) || "Unknown"}
                            </p>
                          </div>
                        </CommandItem>
                      ))}
                      <CommandItem
                        onSelect={() => {
                          router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
                          setIsOpen(false);
                        }}
                        className="justify-center text-movie-primary hover:bg-white/10 cursor-pointer"
                      >
                        See all results
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    <CommandEmpty>No movies found</CommandEmpty>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
