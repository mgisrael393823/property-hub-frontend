
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, Check, Camera, Award, Calendar as CalendarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demonstration
const mockCreator = {
  id: "1",
  name: "Sarah Johnson",
  rating: 4.9,
  responseTime: "< 2h",
  location: "Los Angeles, CA",
  serviceArea: "Greater Los Angeles Area",
  services: ["Real Estate Photography", "Virtual Tours", "Drone Footage", "Floor Plans", "Twilight Shots"],
  equipment: ["Sony Alpha A7IV", "DJI Mavic 3 Pro", "Matterport Pro2", "Wide Angle Lenses"],
  tags: ["Fast Turnaround", "Same-Day Edits", "Licensed Drone Pilot"],
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  bannerUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  bio: "Professional photographer specializing in real estate and architectural photography with over 8 years of experience working with top property teams across Los Angeles. My approach combines technical excellence with an artistic eye to showcase properties in their best light.",
  verified: true,
  portfolio: [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Modern Kitchen Design",
      type: "Interior"
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      title: "Luxury Home Exterior",
      type: "Exterior"
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      title: "Master Bedroom Suite",
      type: "Interior"
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      title: "Drone Aerial View",
      type: "Aerial"
    },
    {
      id: "5",
      imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      title: "Backyard with Pool",
      type: "Exterior"
    },
    {
      id: "6",
      imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      title: "Modern Living Room",
      type: "Interior"
    }
  ],
  reviews: [
    {
      id: "1",
      author: "Michael Davis",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      rating: 5,
      date: "2 weeks ago",
      text: "Sarah is incredibly professional and delivered stunning photos of our property. Her attention to detail and lighting expertise made all the difference in our listing."
    },
    {
      id: "2",
      author: "Jennifer Adams",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      rating: 5,
      date: "1 month ago",
      text: "Working with Sarah was a delight. She was punctual, efficient, and the virtual tour she created helped us sell our home within days of listing. Highly recommend!"
    },
    {
      id: "3",
      author: "Robert Chen",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      rating: 4,
      date: "2 months ago",
      text: "Great experience overall. Sarah has a good eye for composition and delivered the photos ahead of schedule. Would book again for future properties."
    }
  ],
  pricingPlans: [
    {
      name: "Standard",
      price: 249,
      description: "Perfect for smaller properties",
      features: ["Up to 25 photos", "1 property", "24-hour delivery", "Basic editing"]
    },
    {
      name: "Premium",
      price: 399,
      description: "Ideal for mid-size properties",
      features: ["Up to 40 photos", "1 property", "Twilight shots", "Advanced editing", "Virtual tour"]
    },
    {
      name: "Luxury",
      price: 699,
      description: "For high-end luxury properties",
      features: ["Unlimited photos", "Drone footage", "Same-day delivery", "Premium editing", "Virtual tour", "Social media content"]
    }
  ],
  availability: {
    nextAvailable: "Tomorrow",
    businessHours: "Mon-Fri: 8am-6pm, Sat: 9am-4pm"
  }
};

const CreatorProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  
  // In a real app, you would fetch creator data based on the ID
  const creator = mockCreator;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 sm:h-80 w-full bg-brand-dark">
          <img 
            src={creator.bannerUrl} 
            alt={`${creator.name}'s portfolio banner`}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-24 sm:-mt-32 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              <Avatar className="h-28 w-28 ring-4 ring-white shadow-md">
                <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-headers-primary font-heading">
                        {creator.name}
                      </h1>
                      {creator.verified && (
                        <Badge className="bg-brand-secondary text-brand-primary text-xs px-3 py-1 rounded-full font-medium">
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2">
                      <div className="flex items-center text-text-secondary text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-brand-primary" />
                        {creator.location}
                      </div>
                      <div className="flex items-center text-text-secondary text-sm">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        <span className="font-medium text-text-primary">{creator.rating}</span>
                      </div>
                      <div className="flex items-center text-text-secondary text-sm">
                        <Clock className="h-4 w-4 mr-1 text-brand-primary" />
                        {creator.responseTime} response
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-4 sm:mt-0 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold"
                  >
                    Request Booking
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {creator.services.map((service, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary"
                      className="bg-gray-100 text-text-secondary text-xs px-3 py-1 rounded-md"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Portfolio */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card className="p-6 bg-white rounded-2xl border-border">
                  <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">About {creator.name}</h2>
                  <p className="text-text-primary mb-6">{creator.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3 font-heading">Service Area</h3>
                      <p className="text-text-secondary flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-brand-primary" />
                        {creator.serviceArea}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3 font-heading">Equipment</h3>
                      <ul className="space-y-2">
                        {creator.equipment.map((item, idx) => (
                          <li key={idx} className="text-text-secondary flex items-start">
                            <Camera className="h-4 w-4 mr-2 text-brand-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-brand-primary" />
                        Availability
                      </div>
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-text-primary mb-2 font-medium">Next available: {creator.availability.nextAvailable}</p>
                      <p className="text-text-secondary text-sm">{creator.availability.businessHours}</p>
                      
                      <div className="mt-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio">
                <Card className="p-6 bg-white rounded-2xl border-border">
                  <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">Portfolio</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {creator.portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-300">{item.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card className="p-6 bg-white rounded-2xl border-border">
                  <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">Client Reviews</h2>
                  <div className="space-y-6">
                    {creator.reviews.map((review) => (
                      <div key={review.id} className="p-5 border border-gray-200 rounded-xl">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.authorImage} alt={review.author} />
                            <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-text-primary">{review.author}</h4>
                              <span className="text-sm text-text-secondary">{review.date}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <p className="mt-3 text-text-primary">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column: Pricing & Booking */}
          <div className="space-y-6">
            <Card className="p-6 bg-white rounded-2xl border-border shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">Pricing</h2>
              
              <div className="space-y-4">
                {creator.pricingPlans.map((plan, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-text-primary">{plan.name}</h3>
                      <div className="text-lg font-bold text-brand-primary">${plan.price}</div>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start text-sm">
                          <Check className="h-4 w-4 mr-2 text-brand-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-4 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full font-semibold"
                    >
                      Select {plan.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-white rounded-2xl border-border shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">Specialties</h2>
              <div className="space-y-3">
                {creator.tags.map((tag, idx) => (
                  <div key={idx} className="flex items-center">
                    <Award className="h-5 w-5 text-brand-primary mr-3" />
                    <span className="text-text-primary">{tag}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
