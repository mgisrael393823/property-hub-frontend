
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationsDropdown from '@/components/notifications/NotificationsDropdown';
import { ROUTES } from '@/lib/constants';

const Navigation = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-text-primary font-heading">
          ZeroVacancy
        </Link>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to={ROUTES.SEARCH} className="text-text-secondary hover:text-link transition-colors font-sans">
            Find Creators
          </Link>
          <Link to={ROUTES.MANAGER_DASHBOARD} className="text-text-secondary hover:text-link transition-colors font-sans">
            Manager Dashboard
          </Link>
          <Link to={ROUTES.CREATOR_DASHBOARD} className="text-text-secondary hover:text-link transition-colors font-sans">
            Creator Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <NotificationsDropdown />
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-secondary rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => window.location.href = ROUTES.CREATOR_ONBOARDING}
              >
                Join as Creator
              </Button>
              <Button 
                variant="default"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => window.location.href = ROUTES.MANAGER_ONBOARDING}
              >
                Post a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
