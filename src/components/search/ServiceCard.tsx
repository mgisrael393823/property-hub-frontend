
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-sm border-white/10">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2 font-jakarta">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/10">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-gray-300 text-sm">
          {availableCreators} creators available
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={onExplore}
          className="w-full bg-brand-purple hover:bg-brand-purple/90"
        >
          Explore Creators
        </Button>
      </CardFooter>
    </Card>
  );
}
