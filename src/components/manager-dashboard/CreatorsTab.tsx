
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

// Mock data for creators
const creators = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg",
    services: ["Photography", "Virtual Tours"],
    rating: 4.9,
    lastProject: "Office Space Photography"
  },
  {
    id: 2,
    name: "Mike Williams",
    location: "New York, NY",
    avatar: "/placeholder.svg",
    services: ["Photography", "Video"],
    rating: 4.8,
    lastProject: "Apartment Virtual Tour"
  }
];

const CreatorsTab = () => {
  return (
    <div className="space-y-4">
      {creators.map((creator) => (
        <Card key={creator.id}>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{creator.name}</h3>
                <p className="text-sm text-gray-500">{creator.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-700">⭐ {creator.rating}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Last project: {creator.lastProject}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {creator.services.map((service) => (
                <Badge key={service} variant="secondary" className="bg-gray-100">
                  {service}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button className="bg-brand-primary hover:bg-brand-primary/90" size="sm">
                Book Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CreatorsTab;
