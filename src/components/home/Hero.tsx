
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <img 
            src="/lovable-uploads/edebdf2c-aeff-4dbe-8aae-4771bbd0c080.png" 
            alt="Coffee cup with latte art" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            An <span className="text-cafe-gold">unforgettable</span> coffee experience
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-white/90 mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover the charm of an authentic French café in the heart of the city
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/menu">
              <AnimatedButton 
                variant="primary" 
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Discover Menu
              </AnimatedButton>
            </Link>
            <Link to="/#about">
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-cafe-charcoal w-full sm:w-auto whitespace-nowrap"
              >
                Our Story
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
