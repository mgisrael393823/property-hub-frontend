
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
import { Receipt, Download, FileText } from "lucide-react";
import PaymentStats from "../payments/PaymentStats";

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

const PaymentsTab = () => {
  const totalSpent = payments
    .filter(p => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">Payments Overview</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <PaymentStats totalSpent={totalSpent} projectCount={payments.length} />

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
            {payments.map((payment) => (
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
