
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, RefreshCw } from "lucide-react";
import { useAsyncData } from "@/hooks/use-async-data";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

// Mock data for bookings
const bookings = [
  {
    id: 1,
    projectName: "Office Space Photography",
    date: "2025-04-25",
    status: "pending",
    clientName: "Sarah Johnson"
  },
  {
    id: 2,
    projectName: "Apartment Virtual Tour",
    date: "2025-04-28",
    status: "confirmed",
    clientName: "Mike Williams"
  },
  {
    id: 3,
    projectName: "Property Listing Photos",
    date: "2025-04-30",
    status: "completed",
    clientName: "Alex Chen"
  }
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  confirmed: "bg-green-100 text-green-800 hover:bg-green-200",
  completed: "bg-blue-100 text-blue-800 hover:bg-blue-200"
};

// Booking card skeleton component
const BookingCardSkeleton = () => (
  <Card className="bg-white">
    <CardContent className="flex items-center justify-between p-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40 mb-1" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-32" />
      </div>
    </CardContent>
  </Card>
);

const BookingsTab = () => {
  // Simulated delay for loading demonstration (remove in production)
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1500));
  
  // Fetch bookings data
  const fetchBookings = async () => {
    await simulateDelay(); // Remove in production
    
    // In a real app, this would be: return api.bookings.getAll();
    return bookings;
  };
  
  // Use our custom hook to handle loading, error states and data fetching
  const { data, loading, error, refetch } = useAsyncData(
    fetchBookings,
    { errorFallback: [] }
  );
  
  // Show loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <EmptyState
        type="error"
        title="Error loading bookings"
        description="We couldn't load your bookings. Please try again."
        action={{
          label: "Retry",
          onClick: refetch,
          icon: <RefreshCw className="h-4 w-4 mr-2" />,
        }}
      />
    );
  }
  
  // Get the data (will be empty array if there was an error)
  const bookingData = data || [];
  
  if (bookingData.length === 0) {
    return (
      <EmptyState
        type="empty"
        title="No bookings yet"
        description="You don't have any bookings yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookingData.map((booking) => (
        <Card key={booking.id} className="bg-white">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{booking.projectName}</h3>
              <p className="text-sm text-gray-500">{booking.clientName}</p>
              <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className={statusStyles[booking.status as keyof typeof statusStyles]}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsTab;
