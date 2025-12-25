import React from "react";
import { assets } from "../assets/data";

const Contact = () => {
  return (
    <div className=" py-28">
      <form className="flex flex-col items-center text-sm text-slate-800">
        <p className="text-xs bg-black/80 text-white font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>
        <h1 className="text-4xl font-bold py-4 text-center text-accent">
          Let's <span className="text-accent-soft">Get In Touch.</span>
        </h1>
        <p className="max-md:text-sm text-accent-dim pb-10 text-center">
          Or just reach out manually to us at{" "}
          <a href="#" className="text-accent hover:underline">
            hello@nusarasa.com
          </a>
        </p>

        <div className="max-w-96 w-full px-4">
          <label htmlFor="name" className="font-medium">
            Full Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-accent-dim/30 bg-surface rounded-full focus-within:ring-2 focus-within:ring-accent/50 transition-all overflow-hidden">
            <img src={assets.user} alt="" w={19} className="opacity-60" />

            <input
              type="text"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <label htmlFor="email-address" className="font-medium mt-4">
            Email Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-accent-dim/30 bg-surface rounded-full focus-within:ring-2 focus-within:ring-accent/50 transition-all overflow-hidden">
            <img src={assets.mail} alt="" w={19} className="opacity-60" />
            <input
              type="email"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          <label htmlFor="message" className="font-medium mt-4">
            Message
          </label>
          <textarea
            rows="4"
            className="w-full mt-2 p-2 border border-accent-dim/30 bg-surface rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-accent/50 transition-all text-accent"
            placeholder="Enter your message"
            required
          ></textarea>

          <button
            type="submit"
            className="flexCenter gap-1 mt-5 btn-primary w-full !font-bold"
          >
            Submit Form
            <img src={assets.right} alt="" w={19} className="invert" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
