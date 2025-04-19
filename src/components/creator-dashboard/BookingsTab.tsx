
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

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

const BookingsTab = () => {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
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
