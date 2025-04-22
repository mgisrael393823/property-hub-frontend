import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton for portfolio item grid elements
 */
export function PortfolioItemSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton 
          key={index} 
          className="aspect-[4/3] w-full h-full rounded-lg"
        />
      ))}
    </div>
  );
}

export default PortfolioItemSkeleton;