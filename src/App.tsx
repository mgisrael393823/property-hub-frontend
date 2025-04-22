import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from './lib/constants';
import { AuthProvider } from "@/lib/auth/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from "@/lib/error/ErrorBoundary";
import ErrorPage from "@/pages/Error";
import { Suspense, lazy } from "react";
import { LoadingState } from "@/components/ui/loading-state";

// Lazy-loaded example pages
const ErrorTest = lazy(() => import('@/components/examples/ErrorTest'));

// App pages
import Index from "@/app/index";
import CreatorDashboard from "@/app/creator-dashboard";
import ManagerDashboard from "@/app/manager-dashboard";
import Search from "@/app/search";
import CreatorProfile from "@/app/creator/[id]";
import BookingRequest from "@/app/booking/[creatorId]";
import NotFound from "@/pages/NotFound";
import CreatorOnboarding from "@/app/creator/onboarding";
import ManagerOnboarding from "@/app/manager/onboarding";
import NewProject from "@/app/projects/new";
import ProjectBrief from "@/app/projects/[id]";
import ProjectApplicants from "@/app/projects/[id]/applicants";
import AdminDashboard from "@/app/admin-dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Configure React Query with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      // onError will display the error using our error handler
      onError: (error) => {
        console.error('Query error:', error);
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

/**
 * AppRoutes component with routes wrapped in error boundaries
 */
const AppRoutes = () => (
  <ErrorBoundary>
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingState fullPage text="Loading..." />}>
            <Index />
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path={ROUTES.SEARCH} element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingState fullPage text="Loading search..." />}>
            <Search />
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="/creator/:id" element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingState fullPage text="Loading profile..." />}>
            <CreatorProfile />
          </Suspense>
        </ErrorBoundary>
      } />
      <Route path="/login" element={
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      } />
      <Route path="/register" element={
        <ErrorBoundary>
          <Register />
        </ErrorBoundary>
      } />

      {/* Protected routes */}
      <Route 
        path={ROUTES.CREATOR_DASHBOARD} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['creator']}>
              <Suspense fallback={<LoadingState fullPage text="Loading dashboard..." />}>
                <CreatorDashboard />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.MANAGER_DASHBOARD} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['manager']}>
              <Suspense fallback={<LoadingState fullPage text="Loading dashboard..." />}>
                <ManagerDashboard />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path="/manager-dashboard/projects/:projectId/applicants" 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['manager']}>
              <Suspense fallback={<LoadingState fullPage text="Loading applicants..." />}>
                <ProjectApplicants />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path="/booking/:creatorId" 
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingState fullPage text="Loading booking form..." />}>
                <BookingRequest />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.CREATOR_ONBOARDING} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['creator']}>
              <Suspense fallback={<LoadingState fullPage text="Loading onboarding..." />}>
                <CreatorOnboarding />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.MANAGER_ONBOARDING} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['manager']}>
              <Suspense fallback={<LoadingState fullPage text="Loading onboarding..." />}>
                <ManagerOnboarding />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.NEW_PROJECT} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['manager']}>
              <Suspense fallback={<LoadingState fullPage text="Loading project form..." />}>
                <NewProject />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      <Route 
        path="/projects/:id" 
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingState fullPage text="Loading project details..." />}>
              <ProjectBrief />
            </Suspense>
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.ADMIN_DASHBOARD} 
        element={
          <ErrorBoundary>
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingState fullPage text="Loading admin dashboard..." />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        } 
      />
      
      {/* Example and testing routes */}
      <Route path={ROUTES.ERROR_TEST} element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingState fullPage text="Loading error test page..." />}>
            <ErrorTest />
          </Suspense>
        </ErrorBoundary>
      } />
      
      {/* Error and 404 pages */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ErrorBoundary>
);

// App component with authentication context
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;