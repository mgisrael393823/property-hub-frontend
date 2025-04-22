import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../api';
import { toast } from '@/components/ui/use-toast';

// Local storage keys
const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'zero_vacancy_auth_token';
const AUTH_USER_KEY = import.meta.env.VITE_AUTH_USER_KEY || 'zero_vacancy_user';

// Authentication context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  hasRole: () => false,
});

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if the user is logged in on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      
      // Try to load user info from local storage first
      const storedUserStr = localStorage.getItem(AUTH_USER_KEY);
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      
      if (storedUserStr && storedToken) {
        try {
          const storedUser = JSON.parse(storedUserStr);
          setUser(storedUser);
          
          // Verify token validity by calling the API
          const response = await api.auth.me();
          
          if (response.status === 'success') {
            // Update user data with fresh data from the API
            setUser(response.data);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data));
          }
        } catch (error) {
          // Token is invalid, clear storage
          console.error('Failed to load user:', error);
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };
    
    loadUser();
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await api.auth.login({ email, password });
      
      if (response.status === 'success') {
        // Store auth token
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        
        // Store user data
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
        
        // Update state
        setUser(response.data.user);
        
        // Show success message
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${response.data.user.name}!`,
        });
        
        // Redirect based on role
        if (response.data.user.role === 'creator') {
          navigate('/creator-dashboard');
        } else if (response.data.user.role === 'manager') {
          navigate('/manager-dashboard');
        } else if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await api.auth.register({ name, email, password, role });
      
      if (response.status === 'success') {
        // Store auth token
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        
        // Store user data
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
        
        // Update state
        setUser(response.data.user);
        
        // Show success message
        toast({
          title: 'Registration Successful',
          description: 'Your account has been created.',
        });
        
        // Redirect to onboarding based on role
        if (role === 'creator') {
          navigate('/onboarding/creator');
        } else if (role === 'manager') {
          navigate('/onboarding/manager');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await api.auth.logout();
      
      // Clear local storage
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      
      // Update state
      setUser(null);
      
      // Show success message
      toast({
        title: 'Logged Out',
        description: 'You have been logged out successfully.',
      });
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Check if user has a specific role
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };
  
  // Provide auth context value
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    hasRole,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export for direct import
export default AuthContext;