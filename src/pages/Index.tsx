
import React from 'react';
import Navigation from '@/components/Navigation';
import CreatorCard from '@/components/CreatorCard';
import { Button } from '@/components/ui/button';

const FEATURED_CREATORS = [
  {
    id: "1",
    name: "Sarah Miller",
    location: "Los Angeles, CA",
    services: ["Photography", "Video Tours", "Drone Shots"],
    imageUrl: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb"
  },
  {
    id: "2",
    name: "John Davis",
    location: "New York, NY",
    services: ["Virtual Tours", "Floor Plans", "3D Modeling"],
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511"
  },
  {
    id: "3",
    name: "Alex Wong",
    location: "San Francisco, CA",
    services: ["Photography", "Video Editing", "Social Media"],
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navigation />
      
      {/* Hero Section with Improved Glassmorphism for Contrast */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 via-headers-primary/40 to-transparent backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-2xl glass-panel-dark p-8 rounded-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-jakarta">
              Find Verified Real Estate Creators Near You
            </h1>
            <p className="text-lg md:text-xl mb-8 font-inter text-gray-100">
              Connect with local photographers, videographers, and content creators to showcase your properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-brand-purple hover:bg-brand-purple/90 text-white w-full sm:w-auto high-contrast-outline"
              >
                Post a Project
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
              >
                Join as Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-headers-primary mb-2 font-jakarta">
            Featured Creators
          </h2>
          <p className="text-text-primary mb-8 font-inter">
            Discover top-rated real estate content creators in your area
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_CREATORS.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
