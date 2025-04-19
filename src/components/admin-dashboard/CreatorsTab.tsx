
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockCreators = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Verified",
  },
  {
    id: "2",
    name: "Sam Wilson",
    email: "sam@example.com",
    status: "Unverified",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@example.com",
    status: "Flagged",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Verified":
      return "bg-brand-success/20 text-brand-success";
    case "Flagged":
      return "bg-destructive/20 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const CreatorsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Badge variant="outline" className="cursor-pointer">All</Badge>
        <Badge variant="outline" className="cursor-pointer">Verified</Badge>
        <Badge variant="outline" className="cursor-pointer">Flagged</Badge>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCreators.map((creator) => (
              <TableRow key={creator.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-muted-foreground">{creator.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(creator.status)}>
                    {creator.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      Suspend
                    </Button>
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
