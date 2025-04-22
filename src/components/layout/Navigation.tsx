import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationsDropdown from '@/components/notifications/NotificationsDropdown';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle user logout
  const handleLogout = async () => {
    await logout();
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (hasRole('creator')) {
      return ROUTES.CREATOR_DASHBOARD;
    } else if (hasRole('manager')) {
      return ROUTES.MANAGER_DASHBOARD;
    } else if (hasRole('admin')) {
      return ROUTES.ADMIN_DASHBOARD;
    }
    return ROUTES.HOME;
  };

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
          
          {isAuthenticated ? (
            <>
              {/* Show dashboard link if authenticated */}
              <Link 
                to={getDashboardLink()} 
                className="text-text-secondary hover:text-link transition-colors font-sans"
              >
                Dashboard
              </Link>
              
              <div className="flex items-center gap-4">
                <NotificationsDropdown />
                
                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-secondary rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;