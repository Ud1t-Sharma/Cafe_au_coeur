
import React, { useRef, useEffect } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
          elements?.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in-up');
            }, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-cafe-charcoal animate-on-scroll">
              Our <span className="text-cafe-gold">Story</span>
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed animate-on-scroll">
              Founded in 2010 by the Martin brothers, Café au Coéur was born from a passion 
              for the art of coffee and French gastronomy. After studying the art of coffee 
              around the world, the brothers decided to create a space where tradition and 
              innovation meet.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed animate-on-scroll">
              Our team of expert baristas selects the best coffee beans from sustainable and 
              ethical farms. Each cup is prepared with precision and love to offer you an 
              unforgettable experience.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-cafe-cream p-4 rounded-lg text-center animate-on-scroll">
                <div className="text-cafe-gold text-3xl font-bold">12+</div>
                <div className="text-cafe-brown text-sm font-medium">Years of Excellence</div>
              </div>
              
              <div className="bg-cafe-cream p-4 rounded-lg text-center animate-on-scroll">
                <div className="text-cafe-gold text-3xl font-bold">30+</div>
                <div className="text-cafe-brown text-sm font-medium">Signature Recipes</div>
              </div>
              
              <div className="bg-cafe-cream p-4 rounded-lg text-center animate-on-scroll">
                <div className="text-cafe-gold text-3xl font-bold">5K+</div>
                <div className="text-cafe-brown text-sm font-medium">Happy Customers</div>
              </div>
            </div>
            
            <p className="text-gray-700 italic animate-on-scroll">
              "Our mission is simple: to create a haven where every customer can savor a moment 
              of happiness around a perfect cup."
            </p>
          </div>
          
          <div className="order-1 lg:order-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-elegant h-64 animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1442975631115-c4f7b05b6fun?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Our café" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-elegant h-64 animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Coffee preparation" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-elegant h-64 animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                alt="Our team" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2070&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
