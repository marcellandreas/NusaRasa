import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Item from "../Item";
import { useAppContext } from "../../context/AppContext";

import "swiper/css";

const PopularProduct = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  const { products } = useAppContext();

  useEffect(() => {
    const data = products
      .filter((item) => item.popular && item.inStock)
      .slice(0, 5);

    console.log(data);
    setPopularProduct(data);
  }, [products]);

  return (
    <section className="max-padd-container py-22 xl:py-28 bg-white">
      <Title title1={"Popular"} title2={"Products"} titleStyles={"pb-10"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {popularProduct.map((product) => (
          <div key={product._id}>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProduct;
