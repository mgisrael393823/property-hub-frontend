
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: "1",
    title: "Beach Resort Photography",
    postedBy: "Luxury Hotels Inc.",
    applicants: 12,
    status: "Open",
  },
  {
    id: "2",
    title: "Real Estate Virtual Tour",
    postedBy: "City Properties",
    applicants: 8,
    status: "In Progress",
  },
  {
    id: "3",
    title: "Amenities Showcase",
    postedBy: "Mountain Lodges",
    applicants: 5,
    status: "Completed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-brand-success/20 text-brand-success";
    case "In Progress":
      return "bg-brand-primary/20 text-brand-primary";
    case "Completed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const ProjectsTab = () => {
  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Posted by: {project.postedBy}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.applicants}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="ghost">
                    Archive
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
