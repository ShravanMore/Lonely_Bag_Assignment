
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full h-full" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <Skeleton className="h-4 w-4/5 mb-2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
