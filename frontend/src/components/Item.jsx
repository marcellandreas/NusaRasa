import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Item = ({ product }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { currency, addToCart } = useAppContext();

  return (
    <article 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-futuristic rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-surface/50 to-transparent">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent z-10 opacity-60" />
          
          {/* Product Images */}
          <img
            src={product.images[0]}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
            }`}
          />
          <img
            src={product.images[1] || product.images[0]}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase bg-surface/80 backdrop-blur-md border border-accent-dim/20 text-accent-soft rounded-full">
              {product.category}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => addToCart(product._id, size)}
            className={`absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-accent text-primary flexCenter transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } hover:scale-110 active:scale-95`}
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h4 className="text-accent font-semibold line-clamp-1 group-hover:text-accent-soft transition-colors">
              {product.title}
            </h4>
            <div className="flex items-center gap-1 text-accent-dim shrink-0">
              <svg className="w-4 h-4 fill-accent-soft" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm font-medium text-accent-soft">5.0</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-accent-dim line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="flex items-center gap-2 mb-4">
            {product.sizes.map((item) => (
              <button
                key={item}
                onClick={() => setSize(item)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  item === size
                    ? "bg-accent text-primary"
                    : "bg-surface text-accent-dim border border-accent-dim/20 hover:bg-tertiary hover:text-accent"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Price & Time */}
          <div className="flex items-center justify-between pt-4 border-t border-accent-dim/20">
            <div>
              <span className="text-2xl font-bold text-accent">
                {currency}{product.price[size]}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-accent-dim">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5m prep</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <span>20m cook</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: '0 0 60px rgba(180, 180, 180, 0.1), inset 0 0 60px rgba(180, 180, 180, 0.03)'
          }}
        />
      </div>
    </article>
  );
};

export default Item;
