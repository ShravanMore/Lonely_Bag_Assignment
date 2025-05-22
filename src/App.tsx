// DEPRECATED: This file is no longer used after migration to Next.js App Router.
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import RequireAuth from "@/components/RequireAuth";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/movie/:id" 
                element={
                  <RequireAuth>
                    <MovieDetails />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/search" 
                element={
                  <RequireAuth>
                    <SearchResults />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <RequireAuth>
                    <Favorites />
                  </RequireAuth>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
