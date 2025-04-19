
import { useState } from "react";
import CreatorCard from "@/components/CreatorCard";
import { ServiceCard } from "./ServiceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for services
const mockServices = [
  {
    id: "1",
    title: "Drone Videography",
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    availableCreators: 12,
    tags: ["Aerial", "4K", "Commercial"],
  },
  {
    id: "2",
    title: "Interior Photography",
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    availableCreators: 8,
    tags: ["HDR", "Virtual Staging"],
  },
];

interface SearchResultsProps {
  view: "creators" | "services";
}

export function SearchResults({ view }: SearchResultsProps) {
  const [sortValue, setSortValue] = useState("rating");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {view === "creators" 
            ? `${mockCreators.length} Creators Available`
            : "Browse Services"
          }
        </h2>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="response">Fastest Response</SelectItem>
            <SelectItem value="price">Lowest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {view === "creators" ? (
          mockCreators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))
        ) : (
          mockServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onExplore={() => console.log("Explore service:", service.id)}
            />
          ))
        )}
      </div>

      {((view === "creators" && mockCreators.length === 0) || 
        (view === "services" && mockServices.length === 0)) && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">
            No {view === "creators" ? "creators" : "services"} found
          </h3>
          <p className="text-gray-400">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
}
