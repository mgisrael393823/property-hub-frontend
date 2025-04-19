
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-headers-primary to-brand-purple py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Find Verified Real Estate Creators Near You
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Connect with local photographers, videographers, and content creators to showcase your properties.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-headers-primary hover:bg-gray-100">
                Post a Project
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Join as Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-headers-primary mb-2">Featured Creators</h2>
          <p className="text-text-secondary mb-8">Discover top-rated real estate content creators in your area</p>
          
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
