
import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

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
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-text-primary font-heading mb-1">{name}</h3>
            <p className="text-sm text-text-secondary mb-2 font-sans">{location}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm text-text-primary">{rating}</span>
              </div>
              <span className="text-sm text-text-secondary">•</span>
              <span className="text-sm text-text-secondary">{responseTime}</span>
              {verified && (
                <>
                  <span className="text-sm text-text-secondary">•</span>
                  <Badge variant="outline" className="bg-brand-secondary text-brand-primary text-xs px-3 py-1 rounded-full font-medium">
                    Verified
                  </Badge>
                </>
              )}
            </div>
          </div>
          <img 
            src={imageUrl} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-border"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <Badge 
              key={service}
              variant="secondary" 
              className="bg-gray-100 text-text-secondary text-xs px-3 py-1 rounded-md"
            >
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/creator/${id}`} className="flex-1">
          <Button 
            variant="outline" 
            className="w-full border-brand-primary text-brand-primary hover:bg-brand-secondary/50 rounded-full font-semibold"
          >
            View Profile
          </Button>
        </Link>
        <Button 
          className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold"
        >
          Request Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatorCard;
