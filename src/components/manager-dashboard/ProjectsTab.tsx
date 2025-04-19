
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye } from "lucide-react";

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
  return (
    <div className="space-y-4">
      <Button className="w-full sm:w-auto mb-6 bg-brand-primary hover:bg-brand-primary/90">
        Post a New Project
      </Button>

      {projects.map((project) => (
        <Card key={project.id}>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.creator}</p>
              <p className="text-sm text-gray-500">{new Date(project.date).toLocaleDateString()}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Badge variant="secondary" className={statusStyles[project.status as keyof typeof statusStyles]}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsTab;
