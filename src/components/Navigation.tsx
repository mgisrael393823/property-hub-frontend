
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navigation = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-text-primary font-heading">
          ZeroVacancy
        </Link>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to="/search" className="text-text-secondary hover:text-link transition-colors font-sans">
            Find Creators
          </Link>
          <Link to="/manager-dashboard" className="text-text-secondary hover:text-link transition-colors font-sans">
            Manager Dashboard
          </Link>
          <Link to="/creator-dashboard" className="text-text-secondary hover:text-link transition-colors font-sans">
            Creator Dashboard
          </Link>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-secondary rounded-full px-5 py-2.5 text-sm font-semibold"
              onClick={() => window.location.href = '/onboarding/creator'}
            >
              Join as Creator
            </Button>
            <Button 
              variant="default"
              className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-semibold"
              onClick={() => window.location.href = '/onboarding/manager'}
            >
              Post a Project
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
