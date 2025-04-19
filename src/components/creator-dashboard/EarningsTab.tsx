
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WalletCards, Receipt } from "lucide-react";

// Mock data for earnings
const earnings = [
  {
    id: 1,
    project: "Luxury Condo Shoot",
    amount: 450.00,
    date: "2025-04-15",
    status: "completed"
  },
  {
    id: 2,
    project: "Virtual Tour Package",
    amount: 299.99,
    date: "2025-04-20",
    status: "processing"
  },
  {
    id: 3,
    project: "Property Photos",
    amount: 199.99,
    date: "2025-04-25",
    status: "failed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const EarningsTab = () => {
  const totalEarnings = earnings
    .filter(e => e.status === "completed")
    .reduce((sum, earning) => sum + earning.amount, 0);
  
  const pendingEarnings = earnings
    .filter(e => e.status === "processing")
    .reduce((sum, earning) => sum + earning.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 mr-4">
              <WalletCards className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
              <h3 className="text-2xl font-bold font-heading">${totalEarnings.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mr-4">
              <WalletCards className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold font-heading">${pendingEarnings.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mr-4">
              <Receipt className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Payout</p>
              <h3 className="text-2xl font-bold font-heading">Apr 15</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">Payment History</h2>
        <Button className="bg-brand-primary hover:bg-brand-primary/90">
          Connect Bank Account
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {earnings.map((earning) => (
              <TableRow key={earning.id}>
                <TableCell className="font-medium">{earning.project}</TableCell>
                <TableCell>${earning.amount}</TableCell>
                <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(earning.status)}
                  >
                    {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Receipt className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EarningsTab;
