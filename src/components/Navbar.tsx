import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-movie-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-movie-primary to-movie-secondary">
              MovieExplorer
            </span>
          </Link>
          {isAuthenticated && (
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition">
                Home
              </Link>
              <Link
                href="/favorites"
                className="text-sm font-medium text-white/90 hover:text-white transition"
              >
                Favorites
              </Link>
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full bg-gradient-to-r from-movie-primary/20 to-movie-secondary/20"
                >
                  <span className="font-semibold text-white/80">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-movie-dark/95 border-white/10">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="w-[180px] truncate text-xs text-white/60">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-white/80 focus:bg-white/10 focus:text-white"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-movie-primary hover:bg-movie-secondary text-white">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="text-white border-white/20">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
