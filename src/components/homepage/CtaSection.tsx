
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-6 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-jakarta">
            Ready to Post a Project?
          </h2>
          <p className="text-lg text-gray-200 mb-8 font-inter max-w-2xl mx-auto">
            Connect with top real estate content creators and elevate your property marketing today.
          </p>
          <Button 
            size="lg"
            className="bg-brand-purple hover:bg-brand-purple/90 text-white"
            onClick={() => navigate('/onboarding/manager')}
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
