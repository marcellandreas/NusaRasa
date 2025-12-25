import React from "react";
import { assets } from "../assets/data";

const Rating = () => {
  return (
    <div className="inline-flex items-center gap-6 p-4 rounded-2xl glass animate-slide-up" style={{ animationDelay: '0.6s' }}>
      {/* User Avatars */}
      <div className="flex -space-x-3">
        {[assets.user1, assets.user2, assets.user3, assets.user4].map((user, index) => (
          <div 
            key={index}
            className="relative group"
            style={{ zIndex: 4 - index }}
          >
            <img
              src={user}
              alt={`Customer ${index + 1}`}
              className="w-10 h-10 rounded-full border-2 border-secondary object-cover
                transition-transform duration-300 group-hover:-translate-y-1"
            />
            <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-accent-dim/30" />

      {/* Rating Info */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          {Array(5).fill(0).map((_, i) => (
            <svg 
              key={i} 
              className="w-4 h-4 text-accent-soft fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="ml-1 text-sm font-semibold text-accent">5.0</span>
        </div>
        <p className="text-xs text-accent-dim">
          Trusted by <span className="text-accent font-medium">100,000+</span> users
        </p>
      </div>
    </div>
  );
};

export default Rating;
