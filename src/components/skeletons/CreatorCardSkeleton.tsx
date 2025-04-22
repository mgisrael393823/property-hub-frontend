import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for CreatorCard component
 */
export function CreatorCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden bg-white rounded-2xl border-border">
      {/* Image grid skeleton */}
      <div className="grid grid-cols-2 gap-1 p-2">
        {[...Array(4)].map((_, index) => (
          <Skeleton 
            key={index} 
            className="aspect-square w-full h-full" 
          />
        ))}
      </div>
      
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            {/* Name skeleton */}
            <Skeleton className="h-6 w-3/4 mb-2" />
            
            {/* Location skeleton */}
            <Skeleton className="h-4 w-1/2 mb-2" />
            
            {/* Rating and badges skeleton */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          
          {/* Avatar skeleton */}
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0" />
        </div>
        
        {/* Services/tags skeleton */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
        {/* Buttons skeleton */}
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
}

export default CreatorCardSkeleton;