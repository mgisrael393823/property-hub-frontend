import React from 'react';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  fullWidth?: boolean;
}

const DashboardShell = ({ 
  children, 
  title, 
  subtitle, 
  actions,
  fullWidth = false
}: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8",
        fullWidth ? "w-full" : "max-w-7xl"
      )}>
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm md:text-base text-gray-600 max-w-3xl">
                  {subtitle}
                </p>
              )}
            </div>
            
            {actions && (
              <div className="flex-shrink-0 flex mt-2 sm:mt-0 gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;