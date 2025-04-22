
import { useState } from "react";
import CreatorCard from "@/components/CreatorCard";
import { ServiceCard } from "./ServiceCard";
import { useMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, X, ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Mock data for creators
const mockCreators = [
  {
    id: "1",
    name: "Alex Johnson",
    location: "Los Angeles, CA",
    services: ["Photography", "Virtual Tours"],
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    workSamples: [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", type: "image" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", type: "image" },
      { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", type: "image" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3", type: "image" },
    ],
    rating: 4.9,
    responseTime: "< 2h",
    verified: true,
  },
  {
    id: "2",
    name: "Sofia Martinez",
    location: "Miami, FL",
    services: ["Videography", "Drone", "Editing"],
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    workSamples: [
      { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994", type: "image" },
      { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be", type: "image" },
      { url: "https://images.unsplash.com/photo-1554995207-c18c203602cb", type: "image" },
      { url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", type: "image" },
    ],
    rating: 4.7,
    responseTime: "< 24h",
    verified: true,
  },
  {
    id: "3",
    name: "Sam Wilson",
    location: "Austin, TX",
    services: ["Photography", "Virtual Staging"],
    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
    workSamples: [
      { url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83", type: "image" },
      { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa", type: "image" },
      { url: "https://images.unsplash.com/photo-1564078516393-cf04bd966897", type: "image" },
      { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde", type: "image" },
    ],
    rating: 4.5,
    responseTime: "< 12h",
    verified: true,
  },
];

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

const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "response", label: "Fastest Response" },
  { value: "price", label: "Lowest Price" },
];

interface SearchResultsProps {
  view: "creators" | "services";
}

export function SearchResults({ view }: SearchResultsProps) {
  const [sortValue, setSortValue] = useState("rating");
  const isMobile = useMobile('sm');
  const isTablet = useMobile('md');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary font-heading">
          {view === "creators" 
            ? `${mockCreators.length} Creators Available`
            : "Browse Services"
          }
        </h2>
        
        {isMobile ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="px-3">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sort Results</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortValue === option.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSortValue(option.value)}
                  >
                    {option.label}
                    {sortValue === option.value && (
                      <ArrowDownAZ className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
              <DialogClose asChild>
                <Button className="w-full">Apply</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ) : (
          <Select value={sortValue} onValueChange={setSortValue}>
            <SelectTrigger className="w-[180px] bg-white border-border text-text-secondary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <div className="text-center py-8 sm:py-12">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 font-heading">
            No {view === "creators" ? "creators" : "services"} found
          </h3>
          <p className="text-sm sm:text-base text-text-secondary font-sans">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
}
