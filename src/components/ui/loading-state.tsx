import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
}

/**
 * LoadingState component for displaying loading indicators
 */
export function LoadingState({
  className,
  size = 'md',
  text,
  fullPage = false,
}: LoadingStateProps) {
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4 border-2';
      case 'lg':
        return 'h-12 w-12 border-4';
      default:
        return 'h-8 w-8 border-3';
    }
  }, [size]);

  const content = (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={cn(
          "rounded-full border-gray-300 border-t-brand-primary animate-spin",
          sizeClass,
          className
        )}
      />
      {text && (
        <p className="mt-4 text-sm text-gray-500 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

/**
 * LoadingPlaceholder component for creating skeleton loading UIs
 */
export function LoadingPlaceholder({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gray-200 rounded",
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    ></div>
  );
}

export default LoadingState;