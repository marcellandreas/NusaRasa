import React, { useEffect, useState, useRef } from "react";
import { assets } from "../../assets/data";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast Delivery",
    description: "Hot meals delivered to your doorstep in under 30 minutes. Track your order in real-time.",
    stat: "25min",
    statLabel: "avg. delivery"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Multiple payment options with bank-level encryption. Your data is always protected.",
    stat: "100%",
    statLabel: "secure"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your queries. We're always here to help you.",
    stat: "24/7",
    statLabel: "available"
  }
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-dark overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg" />
      
      {/* Geometric Accents */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent-dim/10 rotate-45" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-accent-dim/10 rotate-12" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent-dim/30 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-dim/40 rounded-full" />

      <div className="max-padd-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left - Content */}
          <div>
            {/* Label */}
            <div 
              className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <span className="w-12 h-px bg-accent-dim" />
              <span className="text-xs font-medium tracking-[0.3em] text-accent-dim uppercase">
                Why Choose Us
              </span>
            </div>

            {/* Title */}
            <h2 
              className={`mb-6 text-accent transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              Crafted for
              <br />
              <span className="text-gradient">Excellence</span>
            </h2>

            <p 
              className={`text-accent-soft text-lg mb-12 max-w-lg transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              We combine traditional recipes with modern convenience, 
              ensuring every meal is a perfect blend of authenticity and innovation.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group flex gap-5 p-5 rounded-xl bg-surface/30 border border-accent-dim/10 
                    hover:bg-surface/50 hover:border-accent-dim/20 transition-all duration-500 cursor-default
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface flexCenter text-accent-dim 
                    group-hover:bg-tertiary group-hover:text-accent transition-all duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-accent mb-1 group-hover:text-accent-soft transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-accent-dim line-clamp-2">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-accent-soft">{feature.stat}</div>
                    <div className="text-xs text-accent-dim uppercase tracking-wider">{feature.statLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Images */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src={assets.features1} 
                  alt="Featured dish" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <div 
                className={`absolute -left-8 top-1/4 p-4 rounded-xl glass animate-float transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={assets.features2} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-accent">Fresh Daily</div>
                    <div className="text-xs text-accent-dim">Farm to table</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div 
                className={`absolute -right-4 bottom-1/4 p-4 rounded-xl glass animate-float transition-all duration-700 delay-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface flexCenter">
                    <svg className="w-5 h-5 text-accent-soft" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent">4.9</div>
                    <div className="text-xs text-accent-dim">10K+ reviews</div>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r border-b border-accent-dim/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
