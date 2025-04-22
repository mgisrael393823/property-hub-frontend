import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CreatorCardSkeleton from './CreatorCardSkeleton';
import ServiceCardSkeleton from './ServiceCardSkeleton';

interface SearchResultsSkeletonProps {
  view?: 'creators' | 'services';
  count?: number;
}

/**
 * Skeleton loader for search results
 */
export function SearchResultsSkeleton({ 
  view = 'creators',
  count = 6
}: SearchResultsSkeletonProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {/* Results count skeleton */}
        <Skeleton className="h-7 w-40" />
        
        {/* Sort control skeleton */}
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(count)].map((_, index) => (
          <React.Fragment key={index}>
            {view === 'creators' ? (
              <CreatorCardSkeleton />
            ) : (
              <ServiceCardSkeleton />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsSkeleton;