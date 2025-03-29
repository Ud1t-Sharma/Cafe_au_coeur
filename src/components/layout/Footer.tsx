
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cafe-charcoal text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-medium">
              Café <span className="text-cafe-brown">au</span> <span className="text-cafe-gold">Coéur</span>
            </h3>
            <p className="text-gray-300 max-w-xs">
              A specialty coffee shop in the heart of the city, offering a French 
              gastronomic experience in an elegant and welcoming atmosphere.
            </p>
            <div className="flex space-x-4 text-gray-300">
              <a href="https://facebook.com" className="hover:text-cafe-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-cafe-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-cafe-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white font-serif">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-cafe-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-cafe-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-cafe-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-cafe-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-cafe-gold transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white font-serif">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-cafe-gold mr-2 mt-0.5" />
                <span className="text-gray-300">123 Paris Street, 75001 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-cafe-gold mr-2" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-cafe-gold mr-2" />
                <span className="text-gray-300">hello@cafeaucoeur.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Hours */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-medium text-white font-serif mb-2">Opening Hours</h4>
              <div className="text-gray-300 grid grid-cols-2 gap-2">
                <span>Monday - Friday:</span>
                <span>7:00 AM - 8:00 PM</span>
                <span>Saturday - Sunday:</span>
                <span>8:00 AM - 10:00 PM</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Café au Coéur. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
