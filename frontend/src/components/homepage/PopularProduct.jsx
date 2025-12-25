import React, { useEffect, useState, useRef } from "react";
import Title from "../ui/Title";
import Item from "../Item";
import { useAppContext } from "../../context/AppContext";

const PopularProduct = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { products } = useAppContext();
  const sectionRef = useRef(null);

  useEffect(() => {
    const data = products
      .filter((item) => item.popular && item.inStock)
      .slice(0, 5);
    setPopularProduct(data);
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-darker overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg-dense opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim/20 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent-dim/5 rounded-full blur-3xl" />
      <div className="absolute -right-32 top-1/3 w-48 h-48 bg-accent-dim/3 rounded-full blur-2xl" />

      <div className="max-padd-container relative z-10">
        {/* Header with Navigation */}
        <div 
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Title
            title1="Customer Favorites"
            title2="Most Popular"
            titleStyles="items-start text-left"
            paraStyles="text-left"
            para="Our most loved dishes, chosen by thousands of satisfied customers."
          />
          
          {/* View All Button */}
          <a 
            href="/menu"
            className="btn-outline corner-cut-sm shrink-0 self-start md:self-auto"
          >
            <span className="flex items-center gap-2">
              Browse All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {popularProduct.map((product, index) => (
            <div
              key={product._id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <Item product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl glass">
            <p className="text-accent-dim max-w-md">
              Can't find what you're looking for? Check out our full menu with 50+ dishes.
            </p>
            <a href="/menu" className="btn-primary corner-cut">
              <span className="flex items-center gap-2">
                Explore Full Menu
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;
