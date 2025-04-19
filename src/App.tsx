
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Index />} />
          <Route path={ROUTES.CREATOR_DASHBOARD} element={<CreatorDashboard />} />
          <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboard />} />
          <Route path="/manager-dashboard/projects/:projectId/applicants" element={<ProjectApplicants />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/booking/:creatorId" element={<BookingRequest />} />
          <Route path={ROUTES.CREATOR_ONBOARDING} element={<CreatorOnboarding />} />
          <Route path={ROUTES.MANAGER_ONBOARDING} element={<ManagerOnboarding />} />
          <Route path={ROUTES.NEW_PROJECT} element={<NewProject />} />
          <Route path="/projects/:id" element={<ProjectBrief />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
