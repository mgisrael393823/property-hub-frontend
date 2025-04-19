
import React from 'react';
import Navigation from './Navigation';

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
}

const DashboardShell = ({ children, title }: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default DashboardShell;
