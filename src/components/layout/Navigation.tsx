import React, { useState } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Menu, User, LogOut, LayoutDashboard, Search, Settings } from 'lucide-react';

const Navigation = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu on logout
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

  // Navigation items based on authentication state
  const navigationItems = [
    { 
      name: 'Find Creators', 
      href: ROUTES.SEARCH, 
      icon: <Search className="h-4 w-4 mr-2" />,
      show: 'always' 
    },
    { 
      name: 'Dashboard', 
      href: getDashboardLink(), 
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      show: isAuthenticated ? 'always' : 'never'
    },
    { 
      name: 'Profile', 
      href: ROUTES.PROFILE, 
      icon: <User className="h-4 w-4 mr-2" />,
      show: isAuthenticated ? 'mobile' : 'never'
    },
    { 
      name: 'Settings', 
      href: ROUTES.SETTINGS, 
      icon: <Settings className="h-4 w-4 mr-2" />,
      show: isAuthenticated ? 'mobile' : 'never'
    },
    { 
      name: 'Logout', 
      href: '#',
      icon: <LogOut className="h-4 w-4 mr-2" />,
      action: handleLogout,
      show: isAuthenticated ? 'mobile' : 'never'
    },
  ];

  // Filter navigation items based on device and auth state
  const getNavItems = (device: 'desktop' | 'mobile') => {
    return navigationItems.filter(item => 
      item.show === 'always' || 
      (item.show === device) || 
      (item.show === true)
    );
  };

  return (
    <nav className="w-full py-3 px-4 md:py-4 md:px-6 bg-white sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="text-xl md:text-2xl font-bold text-text-primary font-heading">
          ZeroVacancy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {getNavItems('desktop').map((item, index) => (
            <Link 
              key={index} 
              to={item.href}
              onClick={item.action}
              className="text-text-secondary hover:text-link transition-colors font-sans"
            >
              {item.name}
            </Link>
          ))}
          
          {/* Authentication Elements */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <NotificationsDropdown />
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
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
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(ROUTES.SETTINGS)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-brand-primary text-brand-primary hover:bg-brand-secondary rounded-full"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {isAuthenticated && <NotificationsDropdown />}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="py-4">
                {/* Mobile User Profile (if authenticated) */}
                {isAuthenticated && (
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-3">
                  {getNavItems('mobile').map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          navigate(item.href);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  ))}

                  {/* Auth buttons for non-authenticated users */}
                  {!isAuthenticated && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        className="border-brand-primary text-brand-primary"
                        onClick={() => {
                          navigate(ROUTES.LOGIN);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="default"
                        className="bg-brand-primary"
                        onClick={() => {
                          navigate(ROUTES.REGISTER);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Register
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;