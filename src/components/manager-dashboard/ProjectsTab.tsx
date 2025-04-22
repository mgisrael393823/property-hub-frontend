
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, Plus, RefreshCw } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useAsyncData } from "@/hooks/use-async-data";
import { ProjectCardSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/ui/empty-state";

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Office Space Photography",
    creator: "Sarah Johnson",
    date: "2025-04-25",
    status: "pending"
  },
  {
    id: 2,
    title: "Apartment Virtual Tour",
    creator: "Mike Williams",
    date: "2025-04-28",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Property Listing Photos",
    creator: "Alex Chen",
    date: "2025-04-30",
    status: "delivered"
  }
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800"
};

const ProjectsTab = () => {
  const isMobile = useMobile('sm');
  
  // Simulated delay for loading demonstration (remove in production)
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1500));
  
  // Fetch projects data
  const fetchProjects = async () => {
    await simulateDelay(); // Remove in production
    
    // In a real app, this would be: return api.projects.getAll();
    return projects;
  };
  
  // Use our custom hook to handle loading, error states and data fetching
  const { data, loading, error, refetch } = useAsyncData(
    fetchProjects,
    { errorFallback: [] }
  );
  
  // Render the projects header with button and count
  const renderHeader = (projectCount: number) => (
    <div className="flex justify-between items-center w-full mb-4 sm:mb-6">
      <Button 
        className="bg-brand-primary hover:bg-brand-primary/90 rounded-full"
        size={isMobile ? "sm" : "default"}
      >
        <Plus className="h-4 w-4 mr-2" />
        {isMobile ? "New Project" : "Post a New Project"}
      </Button>
      
      <Badge variant="outline" className="bg-white text-gray-500 hidden sm:flex">
        {projectCount} Projects
      </Badge>
    </div>
  );
  
  // Show loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {renderHeader(0)}
        
        {/* Project cards skeleton */}
        <div className="grid gap-4">
          {[...Array(3)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="space-y-4">
        {renderHeader(0)}
        
        <EmptyState
          type="error"
          title="Error loading projects"
          description="We couldn't load your projects. Please try again."
          action={{
            label: "Retry",
            onClick: refetch,
            icon: <RefreshCw className="h-4 w-4 mr-2" />,
          }}
        />
      </div>
    );
  }
  
  // Get the data (will be empty array if there was an error)
  const projectData = data || [];
  const projectCount = projectData.length;
  
  return (
    <div className="space-y-4">
      {renderHeader(projectCount)}

      {projectCount > 0 ? (
        <div className="grid gap-4">
          {projectData.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium text-gray-900 text-base sm:text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.creator}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{new Date(project.date).toLocaleDateString()}</p>
                    </div>
                    
                    <Badge variant="secondary" className={`${statusStyles[project.status as keyof typeof statusStyles]} self-start whitespace-nowrap text-xs px-2 py-1`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 justify-end mt-2">
                    {isMobile ? (
                      <>
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          type="empty"
          title="No projects yet"
          description="Create your first project to get started"
          action={{
            label: "Create Project",
            onClick: () => console.log("Create project clicked"),
            icon: <Plus className="h-4 w-4 mr-2" />,
          }}
        />
      )}
    </div>
  );
};

export default ProjectsTab;
