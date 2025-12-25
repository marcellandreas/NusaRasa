import React from "react";

const Title = ({
  title1,
  title2,
  titleStyles = "",
  title1Styles = "",
  paraStyles = "",
  para,
}) => {
  // Check if caller wants left alignment
  const isLeftAligned = titleStyles.includes("text-left") || titleStyles.includes("items-start");
  
  return (
    <div className={`flex flex-col ${isLeftAligned ? "items-start" : "items-center"} ${titleStyles}`}>
      {/* Label */}
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-accent-dim" />
        <span className="text-xs font-medium tracking-[0.3em] text-accent-dim uppercase">
          {title1}
        </span>
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-accent-dim" />
      </div>
      
      {/* Main Title */}
      <h2 className={`text-accent ${isLeftAligned ? "text-left" : "text-center"} ${title1Styles}`}>
        {title2}
      </h2>
      
      {/* Description */}
      <p className={`max-w-xl mt-4 text-accent-soft ${isLeftAligned ? "text-left" : "text-center"} ${paraStyles}`}>
        {para
          ? para
          : "Discover fresh flavors that delight your taste, nourish your body, and bring joy to every meal."}
      </p>
    </div>
  );
};

export default Title;
