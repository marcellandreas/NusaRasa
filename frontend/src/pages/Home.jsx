import React from "react";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import About from "../components/About";
import PopularProduct from "../components/PopularProduct";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <section>
      <Hero />
      <NewArrivals />
      <About />
      <PopularProduct />
      <Testimonials />
    </section>
  );
};

export default Home;
