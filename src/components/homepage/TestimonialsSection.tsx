
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialCard = ({ avatar, name, role, quote }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
    <div className="flex items-center gap-4 mb-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-headers-primary font-jakarta">{name}</h4>
        <p className="text-sm text-text-secondary font-inter">{role}</p>
      </div>
    </div>
    <blockquote className="text-text-primary font-inter">"{quote}"</blockquote>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
      name: "Sarah Miller",
      role: "Real Estate Photographer",
      quote: "ZeroVacancy has transformed how I manage my real estate photography business. The platform makes it easy to connect with clients and showcase my work."
    },
    {
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      name: "John Davis",
      role: "Property Marketing Manager",
      quote: "Finding reliable content creators used to be a challenge. Now we have a trusted network of professionals just a click away."
    },
    {
      avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      name: "Alex Wong",
      role: "Drone Specialist",
      quote: "The streamlined booking and payment process lets me focus on what I do best - creating stunning aerial content for properties."
    }
  ];

  return (
    <section className="py-20 px-6 bg-brand-purple/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-headers-primary mb-4 text-center font-jakarta">
          What Our Users Say
        </h2>
        <p className="text-text-primary text-center mb-12 max-w-2xl mx-auto font-inter">
          Join thousands of creators and property teams already using ZeroVacancy.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
