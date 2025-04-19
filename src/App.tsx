import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreatorDashboard from "./pages/CreatorDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Search from "./pages/Search";
import CreatorProfile from "./pages/CreatorProfile";
import BookingRequest from "./pages/Booking/BookingRequest";
import NotFound from "./pages/NotFound";
import CreatorOnboarding from "./pages/Creator/CreatorOnboarding";
import ManagerOnboarding from "./pages/Manager/ManagerOnboarding";
import NewProject from "./pages/projects/NewProject";
import ProjectBrief from "./pages/projects/ProjectBrief";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/booking/:creatorId" element={<BookingRequest />} />
          <Route path="/onboarding/creator" element={<CreatorOnboarding />} />
          <Route path="/onboarding/manager" element={<ManagerOnboarding />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/projects/:id" element={<ProjectBrief />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
