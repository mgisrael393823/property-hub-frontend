
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash, Upload } from "lucide-react";

const mockPortfolio = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Photography"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Virtual Tour"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Video"
  }
];

const PortfolioTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {["All", "Photography", "Virtual Tour", "Video"].map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-gray-200"
            >
              {filter}
            </Badge>
          ))}
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPortfolio.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden">
            <img
              src={item.imageUrl}
              alt={`Portfolio item ${item.id}`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button variant="secondary" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            <Badge className="absolute top-4 left-4">{item.category}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTab;
