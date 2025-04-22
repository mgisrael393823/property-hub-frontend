import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * ProtectedRoute component that restricts access based on authentication and user roles
 * 
 * Usage examples:
 * <ProtectedRoute> // Requires any authenticated user
 *   <Component />
 * </ProtectedRoute>
 * 
 * <ProtectedRoute allowedRoles={['creator']}> // Requires creator role
 *   <Component />
 * </ProtectedRoute>
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading while auth status is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If there are specific role requirements, check them
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'creator') {
      return <Navigate to="/creator-dashboard" replace />;
    } else if (user?.role === 'manager') {
      return <Navigate to="/manager-dashboard" replace />;
    } else if (user?.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Allow access to the protected route
  return <>{children}</>;
};

export default ProtectedRoute;