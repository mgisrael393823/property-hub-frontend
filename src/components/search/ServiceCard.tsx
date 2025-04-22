
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMobile } from "@/hooks/use-mobile";
import { Users } from "lucide-react";

interface ServiceCardProps {
  title: string;
  coverImage: string;
  availableCreators: number;
  tags: string[];
  onExplore: () => void;
}

export function ServiceCard({ title, coverImage, availableCreators, tags, onExplore }: ServiceCardProps) {
  const isMobile = useMobile('sm');
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white rounded-2xl border-border">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {isMobile && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {availableCreators}
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 font-heading">{title}</h3>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-gray-100 text-text-secondary text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {!isMobile && (
          <p className="text-text-secondary text-sm">
            {availableCreators} creators available
          </p>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button 
          onClick={onExplore}
          size={isMobile ? "sm" : "default"}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-semibold"
        >
          {isMobile ? "Explore" : "Explore Creators"}
        </Button>
      </CardFooter>
    </Card>
  );
}
