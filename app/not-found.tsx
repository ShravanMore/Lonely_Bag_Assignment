"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-6xl font-bold text-movie-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
          <p className="text-white/60 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild className="bg-movie-primary hover:bg-movie-secondary">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound; 