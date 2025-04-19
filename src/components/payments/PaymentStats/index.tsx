
import { Card, CardContent } from "@/components/ui/card";
import { WalletCards } from "lucide-react";
import { PaymentStatsProps } from "./types";

const PaymentStats = ({ totalSpent, projectCount }: PaymentStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 mr-4">
            <WalletCards className="h-6 w-6 text-brand-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Spent this Month</p>
            <h3 className="text-2xl font-bold font-heading">${totalSpent.toLocaleString()}</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 mr-4">
            <WalletCards className="h-6 w-6 text-brand-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
            <h3 className="text-2xl font-bold font-heading">{projectCount}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStats;
