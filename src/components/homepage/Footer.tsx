
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-headers-primary font-jakarta">
              ZeroVacancy
            </Link>
            <p className="text-text-secondary font-inter">
              Connecting property teams with professional content creators.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-headers-primary mb-4 font-jakarta">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Find Creators</Link></li>
              <li><Link to="/onboarding/manager" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Post a Project</Link></li>
              <li><Link to="/manager-dashboard" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-headers-primary mb-4 font-jakarta">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Help Center</Link></li>
              <li><Link to="/privacy" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Privacy</Link></li>
              <li><Link to="/terms" className="text-text-primary hover:text-brand-purple transition-colors font-inter">Terms</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-headers-primary mb-4 font-jakarta">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-brand-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-text-secondary text-sm text-center font-inter">
            © {new Date().getFullYear()} ZeroVacancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
