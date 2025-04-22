
import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { Star, Calendar, MessageSquare } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

interface CreatorCardProps {
  id: string;
  name: string;
  location: string;
  services: string[];
  imageUrl: string;
  workSamples?: { url: string; type: string }[];
  rating?: number;
  responseTime?: string;
  verified?: boolean;
}

const CreatorCard = ({ 
  id, 
  name, 
  location, 
  services, 
  imageUrl, 
  workSamples = [], 
  rating = 4.5,
  responseTime = "< 24h",
  verified = true
}: CreatorCardProps) => {
  const isMobile = useMobile('sm');

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-all bg-white rounded-2xl border-border">
      <div className="grid grid-cols-2 gap-1 p-2">
        {workSamples.slice(0, 4).map((sample, index) => (
          <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
            <img 
              src={sample.url} 
              alt={`Work sample ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {!workSamples.length && (
          <div className="col-span-2 aspect-video">
            <img 
              src={imageUrl} 
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary font-heading mb-1">{name}</h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-2 font-sans">{location}</p>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3">
              <div className="flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-0.5 sm:mr-1" />
                <span className="text-xs sm:text-sm text-text-primary">{rating}</span>
              </div>
              <span className="text-xs sm:text-sm text-text-secondary">•</span>
              <span className="text-xs sm:text-sm text-text-secondary">{responseTime}</span>
              {verified && (
                <>
                  <span className="text-xs sm:text-sm text-text-secondary">•</span>
                  <Badge variant="outline" className="bg-brand-secondary text-brand-primary text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                    Verified
                  </Badge>
                </>
              )}
            </div>
          </div>
          <img 
            src={imageUrl} 
            alt={name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-border shrink-0"
          />
        </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {services.map((service) => (
            <Badge 
              key={service}
              variant="secondary" 
              className="bg-gray-100 text-text-secondary text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-md whitespace-nowrap"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
        {isMobile ? (
          <div className="flex w-full gap-2">
            <Link to={`/creator/${id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-9 border-brand-primary text-brand-primary hover:bg-brand-secondary/50 rounded-full font-semibold"
                size="sm"
              >
                View
              </Button>
            </Link>
            <Link to={`/booking/${id}`} className="flex-1">
              <Button 
                size="sm"
                className="w-full h-9 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold"
              >
                Book
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Link to={`/creator/${id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-brand-primary text-brand-primary hover:bg-brand-secondary/50 rounded-full font-semibold"
              >
                View Profile
              </Button>
            </Link>
            <Link to={`/booking/${id}`} className="flex-1">
              <Button 
                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold"
              >
                Request Booking
              </Button>
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreatorCard;
