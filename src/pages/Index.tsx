
import React from 'react';
import Navigation from '@/components/Navigation';
import CreatorCard from '@/components/CreatorCard';
import { Button } from '@/components/ui/button';
import { Search, CalendarCheck, Download } from 'lucide-react';
import WhyCreatorsSection from '@/components/homepage/WhyCreatorsSection';
import WhyTeamsSection from '@/components/homepage/WhyTeamsSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import ContentShowcase from '@/components/homepage/ContentShowcase';
import LogosBar from '@/components/homepage/LogosBar';
import CtaSection from '@/components/homepage/CtaSection';
import Footer from '@/components/homepage/Footer';

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

const HowItWorksCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center space-y-4 transform transition-all hover:scale-105 hover:shadow-md">
    <div className="bg-brand-purple/10 p-4 rounded-full" aria-hidden="true">
      <Icon className="text-brand-purple" size={48} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold font-jakarta text-gray-800">{title}</h3>
    <p className="text-gray-600 font-inter">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-purple focus:left-4 focus:top-4 focus:text-sm focus:rounded-md">
        Skip to main content
      </a>
      <Navigation />
      
      <main id="main-content">
        <section className="relative py-20" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 via-headers-primary/40 to-transparent backdrop-blur-sm" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="max-w-2xl glass-panel-dark p-8 rounded-xl">
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-jakarta">
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
                  className="border-brand-primary text-brand-primary hover:bg-brand-secondary/20 w-full sm:w-auto"
                >
                  Join as Creator
                </Button>
              </div>
            </div>
          </div>
        </section>

      <section className="py-20 px-6 bg-white" aria-labelledby="featured-creators-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="featured-creators-heading" className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-jakarta">
            Featured Creators
          </h2>
          <p className="text-gray-600 mb-8 font-inter">
            Discover top-rated real estate content creators in your area
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_CREATORS.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-gray-800 mb-12 text-center font-jakarta">
            How ZeroVacancy Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard 
              icon={Search}
              title="Search & Compare Creators"
              description="Browse through verified real estate content creators and compare their portfolios, services, and pricing."
            />
            <HowItWorksCard 
              icon={CalendarCheck}
              title="Book & Schedule"
              description="Easily book and schedule content creation sessions with your preferred creators directly through our platform."
            />
            <HowItWorksCard 
              icon={Download}
              title="Review & Download Content"
              description="Access, review, and download high-quality property content created by professional photographers and videographers."
            />
          </div>
        </div>
      </section>

      <WhyCreatorsSection />
      <WhyTeamsSection />
      <TestimonialsSection />
      <ContentShowcase />
      <LogosBar />
      <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
