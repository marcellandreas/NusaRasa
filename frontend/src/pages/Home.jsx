import React from "react";
import {
  About,
  Hero,
  NewArrivals,
  PopularProduct,
  Testimonials,
} from "../components/homepage";

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
