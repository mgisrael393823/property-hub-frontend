
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-gray-800 font-jakarta">
              ZeroVacancy
            </Link>
            <p className="text-gray-600 font-inter">
              Connecting property teams with professional content creators.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4 font-jakarta">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Find Creators</Link></li>
              <li><Link to="/onboarding/manager" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Post a Project</Link></li>
              <li><Link to="/manager-dashboard" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4 font-jakarta">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Help Center</Link></li>
              <li><Link to="/privacy" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-700 hover:text-brand-purple transition-colors font-inter">Terms</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4 font-jakarta">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/zerovacancy" 
                className="text-gray-700 hover:text-brand-purple transition-colors"
                aria-label="Follow on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com/zerovacancy" 
                className="text-gray-700 hover:text-brand-purple transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com/zerovacancy" 
                className="text-gray-700 hover:text-brand-purple transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/zerovacancy" 
                className="text-gray-700 hover:text-brand-purple transition-colors"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center font-inter">
            © {new Date().getFullYear()} ZeroVacancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
