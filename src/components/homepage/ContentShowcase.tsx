
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ContentCard = ({ image, category, title }) => (
  <div className="relative group overflow-hidden rounded-xl">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block px-3 py-1 bg-brand-purple text-white text-sm rounded-full mb-2 font-inter">
          {category}
        </span>
        <h4 className="text-white font-bold font-jakarta">{title}</h4>
      </div>
    </div>
  </div>
);

const ContentShowcase = () => {
  const content = [
    {
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      category: "Drone",
      title: "Aerial Property Views"
    },
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      category: "Photography",
      title: "Professional Interiors"
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      category: "Social Media",
      title: "Instagram Stories"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-headers-primary mb-4 text-center font-jakarta">
          Featured Content
        </h2>
        <p className="text-text-primary text-center mb-12 max-w-2xl mx-auto font-inter">
          Explore the amazing work created by our verified professionals.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {content.map((item, index) => (
              <div key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <ContentCard {...item} />
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

export default ContentShowcase;
