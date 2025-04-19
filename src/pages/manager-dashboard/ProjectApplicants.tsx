
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

// Mock project data
const mockProject = {
  id: "1",
  title: "Office Space Photography",
  location: "123 Business Ave, San Francisco, CA",
  contentRequested: ["Photography", "Virtual Staging"],
  budget: "$500 - $1,000",
};

// Mock applicants data
const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    services: ["Photography", "Virtual Staging"],
    proposal: "I specialize in commercial real estate photography and have extensive experience with office spaces. My work focuses on capturing natural light and showing the potential of each space. I've worked with several property management firms in the Bay Area.",
    quote: "750",
    status: "new"
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg",
    services: ["Photography"],
    proposal: "With 5 years of architectural photography experience, I can highlight the unique features of your office space. I use professional lighting equipment to ensure the best possible results.",
    quote: "850",
    status: "new"
  }
];

export default function ProjectApplicants() {
  const { projectId } = useParams();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState(mockApplicants);

  const handleAccept = (applicantId: string) => {
    setApplicants(currentApplicants =>
      currentApplicants.map(applicant => ({
        ...applicant,
        status: applicant.id === applicantId ? "accepted" : "rejected"
      }))
    );
    toast({
      title: "Application Accepted",
      description: "The creator has been notified of your decision."
    });
  };

  const handleReject = (applicantId: string) => {
    setApplicants(currentApplicants =>
      currentApplicants.map(applicant => ({
        ...applicant,
        status: applicant.id === applicantId ? "rejected" : applicant.status
      }))
    );
    toast({
      title: "Application Rejected",
      description: "The creator has been notified of your decision."
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Project Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">{mockProject.title}</h1>
                <p className="text-gray-600 mt-1">{mockProject.location}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockProject.contentRequested.map((content) => (
                    <Badge key={content} variant="secondary">{content}</Badge>
                  ))}
                </div>
                <p className="text-gray-600 mt-2">Budget: {mockProject.budget}</p>
              </div>
              <Button variant="outline">Edit Project</Button>
            </div>
          </CardContent>
        </Card>

        {/* Applicants List */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-semibold text-gray-900">Project Applicants</h2>
          {applicants.map((applicant) => (
            <Card 
              key={applicant.id}
              className={`${applicant.status === "rejected" ? "opacity-75" : ""}`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={applicant.avatar} alt={applicant.name} />
                        <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-heading font-semibold text-gray-900">{applicant.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {applicant.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusStyles(applicant.status)}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Proposal */}
                  <Collapsible>
                    <CollapsibleTrigger className="text-left">
                      <div className="text-gray-600">
                        {applicant.proposal.slice(0, 100)}...
                        <span className="text-brand-primary ml-2 text-sm">Read more</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 text-gray-600">
                      {applicant.proposal}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Quote & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                    {applicant.quote && (
                      <p className="text-gray-900 font-medium">
                        Quoted Price: ${applicant.quote}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAccept(applicant.id)}
                        disabled={applicant.status !== "new"}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReject(applicant.id)}
                        disabled={applicant.status !== "new"}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
