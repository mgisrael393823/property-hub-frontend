
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface CreatorCardProps {
  id: string;
  name: string;
  location: string;
  services: string[];
  imageUrl: string;
}

const CreatorCard = ({ id, name, location, services, imageUrl }: CreatorCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-headers-primary">{name}</h3>
        <p className="text-text-secondary">{location}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {services.map((service) => (
            <span 
              key={service}
              className="px-2 py-1 bg-brand-medium/10 text-brand-medium rounded-full text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/creator/${id}`} className="w-full">
          <Button variant="outline" className="w-full hover:bg-brand-purple hover:text-white transition-colors">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CreatorCard;
