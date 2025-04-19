
import React from 'react';
import { Award, DollarSign, FileX, Image } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="bg-brand-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-brand-purple" size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2 font-jakarta text-headers-primary">{title}</h3>
    <p className="text-text-primary font-inter">{description}</p>
  </div>
);

const WhyCreatorsSection = () => {
  const features = [
    {
      icon: Award,
      title: "Steady Clients",
      description: "Build lasting relationships with property teams and secure recurring projects."
    },
    {
      icon: DollarSign,
      title: "Fast, Secure Payments",
      description: "Get paid quickly and securely for every completed project."
    },
    {
      icon: FileX,
      title: "Fewer Admin Tasks",
      description: "Focus on creating content while we handle the paperwork."
    },
    {
      icon: Image,
      title: "Showcase Your Portfolio",
      description: "Display your best work to attract high-quality clients."
    }
  ];

  return (
    <section className="py-20 px-6 bg-brand-purple/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-headers-primary mb-4 text-center font-jakarta">
          Why Creators Love ZeroVacancy
        </h2>
        <p className="text-text-primary text-center mb-12 max-w-2xl mx-auto font-inter">
          Join a community of professional real estate content creators and grow your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCreatorsSection;
