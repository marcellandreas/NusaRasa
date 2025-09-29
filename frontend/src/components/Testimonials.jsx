import React from "react";
import Title from "./ui/Title";
import { assets } from "../assets/data";

const testimonialsData = [
  {
    id: 1,
    name: "Donald Jackman",
    role: "Content Creator",
    image: assets.user1,
    bg: "bg-[#edbdcd]",
    textColor: "text-black",
    linkColor: "text-black",
    feedback:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    id: 2,
    name: "Richard Nelson",
    role: "Instagram Influencer",
    image: assets.user2,
    bg: "bg-[#cebfab]",
    textColor: "text-black",
    linkColor: "text-red-500",
    feedback:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    id: 3,
    name: "James Washington",
    role: "Digital Content Creator",
    image: assets.user3,
    bg: "bg-[#edbdcd]",
    textColor: "text-black",
    linkColor: "text-red-500",
    feedback:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

const TestimonialCard = ({
  name,
  role,
  image,
  bg,
  textColor,
  linkColor,
  feedback,
}) => (
  <div className={`text-sm max-w-md pb-6 rounded-lg overflow-hidden ${bg}`}>
    <div className="flex items-center gap-4 px-5 py-4 border-slate-900/10 border-b">
      <img className="h-12 w-12 rounded-full" src={image} alt={name} />
      <div>
        <h1 className="text-lg font-medium text-gray-800">{name}</h1>
        <p className={textColor}>{role}</p>
      </div>
    </div>
    <div className="p-5 pb-7">
      <div className="flex gap-0.5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <img key={i} src={assets.starBlack} alt="star" width={16} />
          ))}
      </div>
      <p className={`${textColor} mt-5`}>{feedback}</p>
    </div>
    <a href="#" className={`${linkColor} underline px-5`}>
      Read more
    </a>
  </div>
);

const Testimonials = () => {
  return (
    <section className="max-padd-container py-20 xl:py-28 bg-white">
      <Title title1="What" title2="People Says" titleStyles="pb-10" />
      <div className="flex flex-wrap items-center justify-center gap-6">
        {testimonialsData.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
