import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for ServiceCard component
 */
export function ServiceCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white rounded-2xl border-border">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />
      
      <CardContent className="p-4 sm:p-6">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-3" />
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        
        {/* Creators count skeleton */}
        <Skeleton className="h-4 w-32" />
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        {/* Button skeleton */}
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export default ServiceCardSkeleton;