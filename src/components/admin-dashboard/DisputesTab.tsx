
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

const mockDisputes = [
  {
    id: "1",
    type: "Booking",
    submittedBy: "Mountain Lodges",
    summary: "Creator didn't show up for scheduled shoot",
    status: "New",
  },
  {
    id: "2",
    type: "Review",
    submittedBy: "Coastal Properties",
    summary: "Inappropriate content in review",
    status: "Under Review",
  },
  {
    id: "3",
    type: "Profile",
    submittedBy: "Beach Rentals",
    summary: "Misrepresented credentials",
    status: "New",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Booking":
      return "bg-yellow-100 text-yellow-800";
    case "Review":
      return "bg-purple-100 text-purple-800";
    case "Profile":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const DisputesTab = () => {
  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDisputes.map((dispute) => (
            <TableRow key={dispute.id}>
              <TableCell>
                <Badge className={getTypeColor(dispute.type)}>
                  {dispute.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    Submitted by: {dispute.submittedBy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dispute.summary}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{dispute.status}</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Review Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
