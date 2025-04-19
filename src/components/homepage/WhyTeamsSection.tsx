
import React from 'react';
import { ShieldCheck, Receipt, Database, Clock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
    <div className="bg-brand-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-brand-purple" size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2 font-jakarta text-headers-section">{title}</h3>
    <p className="text-text-primary font-inter">{description}</p>
  </div>
);

const WhyTeamsSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Creators Only",
      description: "Work with pre-vetted, professional content creators you can trust."
    },
    {
      icon: Receipt,
      title: "Fixed, Transparent Pricing",
      description: "Clear, upfront pricing with no hidden fees or surprises."
    },
    {
      icon: Database,
      title: "One Dashboard for Everything",
      description: "Manage all your content creation projects in one place."
    },
    {
      icon: Clock,
      title: "Faster Turnaround Times",
      description: "Get your content faster with our streamlined process."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-headers-section mb-4 text-center font-jakarta">
          Why Property Teams Use ZeroVacancy
        </h2>
        <p className="text-text-primary text-center mb-12 max-w-2xl mx-auto font-inter">
          Scale your property marketing with our network of professional creators.
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

export default WhyTeamsSection;
