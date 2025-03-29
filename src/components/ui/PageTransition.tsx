
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    
    // Reset animation classes
    page.classList.remove('animate-fade-in');
    
    // Force a reflow to ensure the animation restarts
    void page.offsetWidth;
    
    // Add animation class
    page.classList.add('animate-fade-in');
    
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef} 
      className="min-h-screen animate-fade-in"
      style={{ animationDuration: '0.4s' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
