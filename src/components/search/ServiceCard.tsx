
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  title: string;
  coverImage: string;
  availableCreators: number;
  tags: string[];
  onExplore: () => void;
}

export function ServiceCard({ title, coverImage, availableCreators, tags, onExplore }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white rounded-2xl border-border">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-text-secondary text-xs px-3 py-1 rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-text-secondary text-sm">
          {availableCreators} creators available
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={onExplore}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-semibold"
        >
          Explore Creators
        </Button>
      </CardFooter>
    </Card>
  );
}
