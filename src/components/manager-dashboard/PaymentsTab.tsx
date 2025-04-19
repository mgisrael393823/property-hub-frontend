
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

// Mock data for payments
const payments = [
  {
    id: 1,
    project: "Office Space Photography",
    amount: 299.99,
    status: "paid",
    deliverables: true,
    date: "2025-04-25"
  },
  {
    id: 2,
    project: "Apartment Virtual Tour",
    amount: 499.99,
    status: "pending",
    deliverables: false,
    date: "2025-04-28"
  },
  {
    id: 3,
    project: "Property Listing Photos",
    amount: 199.99,
    status: "paid",
    deliverables: true,
    date: "2025-04-30"
  }
];

const PaymentsTab = () => {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deliverables</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.project}</TableCell>
              <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {payment.deliverables ? (
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                ) : (
                  <span className="text-gray-500">Pending</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTab;
