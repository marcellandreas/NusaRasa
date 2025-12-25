import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-dim/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-dim/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Geometric Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent-dim/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent-dim/10 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-dim/10 to-transparent" />
      </div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-padd-container w-full pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="w-2 h-2 bg-accent-soft rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent-soft tracking-wide">
              AUTHENTIC INDONESIAN FLAVORS
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`mb-6 transition-all duration-1000 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block text-accent">Experience the</span>
            <span className="block text-gradient-flow">Art of Taste</span>
          </h1>

          {/* Subheading */}
          <p 
            className={`max-w-2xl mx-auto text-lg md:text-xl text-accent-soft mb-12 transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Discover our curated collection of traditional recipes, 
            reimagined for the modern palate. Fresh ingredients, 
            bold flavors, delivered to your door.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to="/menu" className="btn-primary corner-cut group">
              <span className="flex items-center gap-3">
                Explore Menu
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link to="/contact" className="btn-outline corner-cut">
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-accent-dim/20 transition-all duration-1000 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              { value: "50+", label: "Unique Dishes" },
              { value: "10K+", label: "Happy Customers" },
              { value: "4.9", label: "Average Rating" },
              { value: "25min", label: "Avg Delivery" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-accent-dim tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      {/* Corner Accents */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-accent-dim/20" />
      <div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-accent-dim/20" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-accent-dim/20" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-accent-dim/20" />
    </section>
  );
};

export default Hero;
