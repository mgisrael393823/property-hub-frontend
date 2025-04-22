import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for ProjectCard component used in dashboards
 */
export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              {/* Title skeleton */}
              <Skeleton className="h-6 w-3/4 mb-2" />
              
              {/* Creator name skeleton */}
              <Skeleton className="h-4 w-1/2 mb-1" />
              
              {/* Date skeleton */}
              <Skeleton className="h-4 w-1/3" />
            </div>
            
            {/* Status badge skeleton */}
            <Skeleton className="h-6 w-24 self-start" />
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex gap-2 justify-end mt-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCardSkeleton;