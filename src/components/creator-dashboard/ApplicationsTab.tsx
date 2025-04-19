
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app this would come from an API
const applications = [
  {
    id: "1",
    projectTitle: "Office Space Photography",
    location: "San Francisco, CA",
    contentTypes: ["Photography", "Virtual Staging"],
    status: "pending",
  },
  {
    id: "2",
    projectTitle: "Luxury Condo Video Tour",
    location: "Los Angeles, CA",
    contentTypes: ["Video Tour", "Drone"],
    status: "accepted",
  },
  {
    id: "3",
    projectTitle: "Apartment Complex Showcase",
    location: "Seattle, WA",
    contentTypes: ["Photography", "Reels/Social Content"],
    status: "rejected",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const ApplicationsTab = () => {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-4 flex-grow">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-1">
                  {application.projectTitle}
                </h3>
                <p className="text-sm text-gray-600">{application.location}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {application.contentTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Badge
                variant="outline"
                className={`capitalize ${getStatusStyles(application.status)}`}
              >
                {application.status}
              </Badge>

              <div className="flex gap-2 w-full sm:w-auto">
                <Link to={`/projects/${application.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </Link>
                {application.status === "pending" && (
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationsTab;
