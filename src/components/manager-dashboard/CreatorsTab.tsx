
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, RefreshCw } from "lucide-react";
import { useAsyncData } from "@/hooks/use-async-data";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

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

// Simulated creator card skeleton component
const CreatorCardSkeleton = () => (
  <Card>
    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="flex items-center gap-2 mt-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="flex gap-2 mt-4 sm:mt-0">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </CardContent>
  </Card>
);

const CreatorsTab = () => {
  // Simulated delay for loading demonstration (remove in production)
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1500));
  
  // Fetch creators data
  const fetchCreators = async () => {
    await simulateDelay(); // Remove in production
    
    // In a real app, this would be: return api.creators.getAll();
    return creators;
  };
  
  // Use our custom hook to handle loading, error states and data fetching
  const { data, loading, error, refetch } = useAsyncData(
    fetchCreators,
    { errorFallback: [] }
  );
  
  // Show loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <CreatorCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <EmptyState
        type="error"
        title="Error loading creators"
        description="We couldn't load your list of creators. Please try again."
        action={{
          label: "Retry",
          onClick: refetch,
          icon: <RefreshCw className="h-4 w-4 mr-2" />,
        }}
      />
    );
  }
  
  // Get the data (will be empty array if there was an error)
  const creatorData = data || [];
  
  if (creatorData.length === 0) {
    return (
      <EmptyState
        type="empty"
        title="No creators yet"
        description="You haven't worked with any creators yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {creatorData.map((creator) => (
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
