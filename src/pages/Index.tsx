
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import AboutSection from '@/components/home/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedItems />
      <AboutSection />
    </div>
  );
};

export default Index;
