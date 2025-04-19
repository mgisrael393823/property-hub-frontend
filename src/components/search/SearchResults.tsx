
import CreatorCard from "@/components/CreatorCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for demonstration
const mockCreators = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    services: ["Photography", "Virtual Tours"],
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "San Francisco, CA",
    services: ["Videography", "Drone Footage"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  // Add more mock creators as needed
]

export function SearchResults() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {mockCreators.length} Creators Available
        </h2>
        <Select defaultValue="rating">
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
        {mockCreators.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>

      {mockCreators.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">
            No creators found
          </h3>
          <p className="text-gray-400">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  )
}
