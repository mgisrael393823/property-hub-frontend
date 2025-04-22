import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for profile headers (Creator profiles, etc.)
 */
export function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      {/* Avatar skeleton */}
      <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
      
      <div className="flex-1">
        {/* Name skeleton */}
        <Skeleton className="h-8 w-1/3 mb-2" />
        
        {/* Subtitle/location skeleton */}
        <Skeleton className="h-5 w-1/4 mb-3" />
        
        {/* Stats row skeleton */}
        <div className="flex flex-wrap gap-4 mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-18" />
        </div>
      </div>
      
      {/* Actions skeleton */}
      <div className="flex gap-2 w-full md:w-auto">
        <Skeleton className="h-10 w-full md:w-32" />
        <Skeleton className="h-10 w-full md:w-32" />
      </div>
    </div>
  );
}

export default ProfileHeaderSkeleton;