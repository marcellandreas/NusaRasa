import React, { useEffect, useState, useRef } from "react";
import { assets } from "../../assets/data";
import Title from "../ui/Title";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Food Blogger",
    image: assets.user1,
    feedback: "The attention to authentic flavors is remarkable. Every dish tells a story of Indonesian heritage while maintaining modern presentation. Absolutely outstanding!",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Restaurant Critic",
    image: assets.user2,
    feedback: "NusaRasa has redefined what food delivery can be. The packaging keeps everything fresh, and the taste? It's like having a personal chef from Jakarta.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Lifestyle Influencer",
    image: assets.user3,
    feedback: "I've tried countless delivery services, but nothing compares to this. The Rendang melts in your mouth, and the Nasi Goreng is perfection.",
    rating: 5,
  },
];

const TestimonialCard = ({ name, role, image, feedback, rating, index, isVisible }) => (
  <div 
    className={`group relative h-full transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
    style={{ transitionDelay: `${200 + index * 150}ms` }}
  >
    <div className="h-full p-6 md:p-8 rounded-2xl bg-surface/30 border border-accent-dim/10 
      hover:bg-surface/50 hover:border-accent-dim/20 transition-all duration-500">
      {/* Quote Icon */}
      <div className="mb-6">
        <svg className="w-10 h-10 text-accent-dim/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array(rating).fill(0).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-accent-soft fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Feedback */}
      <p className="text-accent-soft text-base leading-relaxed mb-8">
        "{feedback}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-accent-dim/20"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-dim/40 rounded-full flexCenter">
            <svg className="w-2.5 h-2.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
        </div>
        <div>
          <div className="font-semibold text-accent">{name}</div>
          <div className="text-sm text-accent-dim">{role}</div>
        </div>
      </div>
    </div>

    {/* Hover Glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: '0 0 80px rgba(180, 180, 180, 0.05)' }}
    />
  </div>
);

const Testimonials = () => {
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
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim/20 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 border border-accent-dim/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-accent-dim/10 rounded-full" />

      <div className="max-padd-container relative z-10">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Title
            title1="Testimonials"
            title2="What People Say"
            titleStyles="pb-4"
            para="Don't just take our word for it. Here's what our customers have to say about their experience."
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              {...testimonial} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div 
          className={`mt-16 pt-16 border-t border-accent-dim/10 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: "10,000+", label: "Happy Customers" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "50+", label: "Menu Items" },
              { value: "98%", label: "On-Time Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-accent-dim">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
