
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navigation = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-headers-primary">
          ZeroVacancy
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/search" className="text-text-primary hover:text-headers-highlight transition-colors">
            Find Creators
          </Link>
          <Link to="/manager-dashboard" className="text-text-primary hover:text-headers-highlight transition-colors">
            Manager Dashboard
          </Link>
          <Link to="/creator-dashboard" className="text-text-primary hover:text-headers-highlight transition-colors">
            Creator Dashboard
          </Link>
          <Button 
            variant="default"
            className="bg-brand-purple hover:bg-headers-highlight text-white"
          >
            Post a Project
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
