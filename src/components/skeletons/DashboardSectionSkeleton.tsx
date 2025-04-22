import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardSectionSkeletonProps {
  itemCount?: number;
  itemComponent: React.ReactNode;
}

/**
 * Generic skeleton for dashboard sections with a header and list of items
 */
export function DashboardSectionSkeleton({
  itemCount = 3,
  itemComponent
}: DashboardSectionSkeletonProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        {/* Section title skeleton */}
        <Skeleton className="h-6 w-1/4 mb-1" />
        
        {/* Section description skeleton */}
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      
      {/* Section content skeleton with repeated items */}
      <div className="p-6 pt-0 space-y-4">
        {[...Array(itemCount)].map((_, index) => (
          <React.Fragment key={index}>
            {itemComponent}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

export default DashboardSectionSkeleton;