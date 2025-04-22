import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from './lib/constants';
import { AuthProvider } from "@/lib/auth/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';

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

const queryClient = new QueryClient();

// App component with authentication context
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.HOME} element={<Index />} />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route 
              path={ROUTES.CREATOR_DASHBOARD} 
              element={
                <ProtectedRoute allowedRoles={['creator']}>
                  <CreatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.MANAGER_DASHBOARD} 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manager-dashboard/projects/:projectId/applicants" 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <ProjectApplicants />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking/:creatorId" 
              element={
                <ProtectedRoute>
                  <BookingRequest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.CREATOR_ONBOARDING} 
              element={
                <ProtectedRoute allowedRoles={['creator']}>
                  <CreatorOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.MANAGER_ONBOARDING} 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <ManagerOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.NEW_PROJECT} 
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <NewProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects/:id" 
              element={<ProjectBrief />} 
            />
            <Route 
              path={ROUTES.ADMIN_DASHBOARD} 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 page */}
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;