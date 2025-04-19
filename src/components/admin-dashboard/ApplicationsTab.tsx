
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockApplications = [
  {
    id: "1",
    creatorName: "Alex Morgan",
    projectTitle: "Beachfront Property Shoot",
    message: "I have extensive experience photographing luxury beachfront properties and would love to work on this project...",
  },
  {
    id: "2",
    creatorName: "Jordan Lee",
    projectTitle: "Downtown Condo Virtual Tour",
    message: "Having completed over 50 virtual tours for high-rise properties, I believe I would be a perfect fit...",
  },
];

export const ApplicationsTab = () => {
  return (
    <div className="space-y-4">
      {mockApplications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              {application.creatorName} → {application.projectTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{application.message}</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="default">Approve</Button>
              <Button variant="ghost" className="text-destructive">
                Reject
              </Button>
              <Button variant="outline">Flag</Button>
            </div>
          </CardFooter>
          <Separator />
        </Card>
      ))}
    </div>
  );
};
