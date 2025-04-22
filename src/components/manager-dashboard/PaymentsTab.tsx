
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Receipt, Download, FileText, RefreshCw } from "lucide-react";
import PaymentStats from "../payments/PaymentStats";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRowSkeleton } from "@/components/skeletons";
import { useAsyncData } from "@/hooks/use-async-data";
import { EmptyState } from "@/components/ui/empty-state";

// Mock data for payments
const payments = [
  {
    id: 1,
    project: "Office Space Photography",
    creator: "Alex Morgan",
    amount: 299.99,
    status: "paid",
    deliverables: true,
    date: "2025-04-25"
  },
  {
    id: 2,
    project: "Apartment Virtual Tour",
    creator: "Sarah Chen",
    amount: 499.99,
    status: "pending",
    deliverables: false,
    date: "2025-04-28"
  },
  {
    id: 3,
    project: "Property Listing Photos",
    creator: "Michael Brown",
    amount: 199.99,
    status: "refunded",
    deliverables: true,
    date: "2025-04-30"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "refunded":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Payment stats skeleton loader
const PaymentStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Skeleton className="h-32 rounded-lg" />
    <Skeleton className="h-32 rounded-lg" />
    <Skeleton className="h-32 rounded-lg" />
  </div>
);

const PaymentsTab = () => {
  // Simulated delay for loading demonstration (remove in production)
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1500));
  
  // Fetch payments data
  const fetchPayments = async () => {
    await simulateDelay(); // Remove in production
    
    // In a real app, this would be: return api.payments.getAll();
    return payments;
  };
  
  // Use our custom hook to handle loading, error states and data fetching
  const { data, loading, error, refetch } = useAsyncData(
    fetchPayments,
    { errorFallback: [] }
  );

  // Calculate totals
  const paymentData = data || [];
  const totalSpent = paymentData
    .filter(p => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Show loading skeleton
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>

        <PaymentStatsSkeleton />

        <div className="rounded-lg border border-border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRowSkeleton 
                  key={index} 
                  columns={6} 
                  cellWidths={["25%", "15%", "15%", "10%", "15%", "20%"]}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <EmptyState
        type="error"
        title="Error loading payment data"
        description="We couldn't load your payment history. Please try again."
        action={{
          label: "Retry",
          onClick: refetch,
          icon: <RefreshCw className="h-4 w-4 mr-2" />,
        }}
      />
    );
  }
  
  // Show empty state if no payments
  if (paymentData.length === 0) {
    return (
      <EmptyState
        type="empty"
        title="No payment history"
        description="You don't have any payment records yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">Payments Overview</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <PaymentStats totalSpent={totalSpent} projectCount={paymentData.length} />

      <div className="rounded-lg border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.project}</TableCell>
                <TableCell>{payment.creator}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(payment.status)}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Receipt className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
                    {payment.deliverables && (
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Files
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsTab;
