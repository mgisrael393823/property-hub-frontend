
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navigation = () => {
  return (
    <nav className="w-full py-4 px-6 backdrop-blur-md bg-brand-dark/80 sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-white font-jakarta">
          ZeroVacancy
        </Link>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to="/search" className="text-gray-300 hover:text-white transition-colors font-inter">
            Find Creators
          </Link>
          <Link to="/manager-dashboard" className="text-gray-300 hover:text-white transition-colors font-inter">
            Manager Dashboard
          </Link>
          <Link to="/creator-dashboard" className="text-gray-300 hover:text-white transition-colors font-inter">
            Creator Dashboard
          </Link>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="border-brand-purple text-white hover:bg-brand-purple/20"
              onClick={() => window.location.href = '/onboarding/creator'}
            >
              Join as Creator
            </Button>
            <Button 
              variant="default"
              className="bg-brand-purple hover:bg-brand-purple/90 text-white whitespace-nowrap"
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
