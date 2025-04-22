import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { AlertCircle, Search, RefreshCw, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
  type?: 'empty' | 'error' | 'no-results' | 'loading-error';
}

/**
 * EmptyState component for displaying empty states, errors, or no results found
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  type = 'empty',
}: EmptyStateProps) {
  // Default icons based on type
  const defaultIcon = React.useMemo(() => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      case 'no-results':
        return <Search className="h-12 w-12 text-gray-400" />;
      case 'loading-error':
        return <RefreshCw className="h-12 w-12 text-yellow-500" />;
      default:
        return <Plus className="h-12 w-12 text-gray-400" />;
    }
  }, [type]);

  // Background and border colors
  const bgColor = React.useMemo(() => {
    switch (type) {
      case 'error':
        return 'bg-red-50';
      case 'loading-error':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  }, [type]);

  return (
    <div className={cn(
      'flex flex-col items-center justify-center px-4 py-12 text-center rounded-lg border',
      bgColor,
      type === 'error' ? 'border-red-100' : 'border-gray-200',
      className
    )}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
        {icon || defaultIcon}
      </div>
      
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
      
      {description && (
        <p className="mt-2 text-sm text-gray-600 max-w-md">
          {description}
        </p>
      )}
      
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              className="flex items-center gap-2"
            >
              {action.icon}
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="flex items-center gap-2"
            >
              {secondaryAction.icon}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;