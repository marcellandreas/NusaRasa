import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Item from "../Item";
import Title from "../ui/Title";
import { useAppContext } from "../../context/AppContext";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { products } = useAppContext();

  useEffect(() => {
    const data = products.filter((item) => item.inStock).slice(0, 10);
    setNewArrivals(data);
    setMounted(true);
  }, [products]);

  return (
    <section className="relative section-darker overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg-dense opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim/20 to-transparent" />
      
      {/* Floating Orb */}
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-dim/5 rounded-full blur-3xl" />

      <div className="max-padd-container relative z-10">
        {/* Header */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Title
            title1="Fresh"
            title2="New Arrivals"
            titleStyles="pb-4"
            para="Explore our latest additions, crafted with passion and the finest ingredients."
          />
        </div>

        {/* Products Slider */}
        <div 
          className={`transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Swiper
            spaceBetween={24}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true 
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {newArrivals.map((product, index) => (
              <SwiperSlide key={product._id}>
                <div 
                  className="opacity-0 animate-slide-up"
                  style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <Item product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Link */}
        <div 
          className={`text-center mt-8 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a 
            href="/menu" 
            className="inline-flex items-center gap-2 text-accent-dim hover:text-accent transition-colors duration-300 group"
          >
            <span className="text-sm font-medium tracking-wide">View All Products</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
