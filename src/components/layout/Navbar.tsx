
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  
  const totalItems = getTotalItems();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Menu', path: '/menu' },
    { title: 'About', path: '/#about' },
    { title: 'Contact', path: '/#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-cafe-charcoal">
              Café <span className="text-cafe-brown">au</span> <span className="text-cafe-gold">Coéur</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-cafe-charcoal font-medium hover:text-cafe-brown transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cafe-brown after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 after:duration-300 ${location.pathname === link.path ? 'after:scale-x-100' : ''}`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-cafe-charcoal hover:text-cafe-brown transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cafe-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-cafe-charcoal" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white/95 backdrop-blur-lg absolute w-full left-0 transition-all duration-300 ease-in-out shadow-md ${isMenuOpen ? 'opacity-100 max-h-96 py-4' : 'opacity-0 max-h-0 overflow-hidden py-0'}`}>
        <div className="container mx-auto px-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`block py-2 text-cafe-charcoal font-medium hover:text-cafe-brown transition-colors ${location.pathname === link.path ? 'text-cafe-brown' : ''}`}
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-2 pb-2">
            <AnimatedButton 
              size="sm" 
              onClick={() => window.location.href = '/cart'}
              className="w-full"
            >
              View Cart {totalItems > 0 && `(${totalItems})`}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
