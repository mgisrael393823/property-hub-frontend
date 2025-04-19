
import React from 'react';
import Navigation from '@/components/Navigation';

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-headers-primary">Manager Dashboard</h1>
      </div>
    </div>
  );
};

export default ManagerDashboard;
