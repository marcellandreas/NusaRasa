import React, { useEffect, useState } from "react";
import Title from "./ui/Title";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import Item from "./Item";
import { useAppContext } from "../context/AppContext";

const NewArrivals = () => {
  const [NewArrivals, setNewArrivals] = useState([]);

  const { products } = useAppContext();

  useEffect(() => {
    const data = products.filter((item) => item.inStock).slice(0, 10);
    setNewArrivals(data);
  }, [products]);
  return (
    <section className="max-padd-container py-22 xl:py-28 bg-white">
      <Title title1={"New"} title2={"Arrivals"} titleStyles={"pb-10"} />
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          500: { slidesPerView: 2 },
          700: { slidesPerView: 3 },
          1022: { slidesPerView: 4 },
          1350: { slidesPerView: 5 },
        }}
        className="min-h-[399px]"
      >
        {NewArrivals.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
