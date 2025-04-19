
import React from 'react';
import Navigation from '@/components/Navigation';
import { useParams } from 'react-router-dom';
import { CreatorHero } from '@/components/creator/CreatorHero';
import { CreatorPortfolio } from '@/components/creator/CreatorPortfolio';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

// Mock data for demonstration
const mockCreator = {
  name: "Sarah Johnson",
  rating: 4.8,
  location: "Los Angeles, CA",
  services: ["Photography", "Virtual Tours", "Drone Footage"],
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  bio: "Professional photographer specializing in real estate and architectural photography. Over 8 years of experience working with top property teams in LA.",
  portfolio: [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Luxury Home Exterior",
      type: "Photography"
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Modern Kitchen",
      type: "Virtual Tour"
    },
    // Add more portfolio items as needed
  ]
};

const CreatorProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navigation />
      
      <CreatorHero {...mockCreator} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-white mb-4 font-jakarta">About</h2>
              <p className="text-gray-300">{mockCreator.bio}</p>
            </div>
            
            <CreatorPortfolio items={mockCreator.portfolio} />
          </div>
          
          <div className="lg:pl-8">
            <div className="sticky top-8 space-y-6">
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 font-jakarta flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </h3>
                <div className="space-y-4">
                  {mockCreator.services.map((service) => (
                    <div key={service} className="flex justify-between items-center">
                      <span className="text-gray-300">{service}</span>
                      <span className="text-white font-medium">From $299</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                size="lg"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
