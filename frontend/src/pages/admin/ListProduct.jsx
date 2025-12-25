import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListProduct = () => {
  const { products, currency, fetchProducts, axios, getToken } =
    useAppContext();

  const toggleStock = async (productId, inStock) => {
    try {
      const { data } = await axios.post(
        "/api/products/toggle-stock",
        { productId, inStock },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll w-full lg:w-11/12 bg-primary shadow rounded-xl">
      <div className=" flex flex-col gap-2 lg:w-11/12">
        <div className="grid grid-cols-[1.5fr_3.5fr_2fr_1.5fr_1fr] items-center py-4 px-2 bg-tertiary text-accent bold-14 sm:bold-15 mb-1 rounded-xl">
          <h5>Images</h5>
          <h5>Title</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>InStock</h5>
        </div>
        {/* product list */}
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1.5fr_3.5fr_2fr_1.5fr_1fr] items-center gap-2 p-2 bg-white rounded-lg"
          >
            <img
              src={product.images[0]}
              className="w-12 bg-primary rounded"
              alt={product.images[0]}
            />
            <h5 className=" text-sm font-semibold line-clamp-2">
              {product.title}
            </h5>
            <p className=" text-sm font-semibold ">{product.category}</p>
            <div className=" text-sm font-semibold ">
              From {currency}
              {product.price[product.sizes[0]]}
            </div>
            <div>
              <label className=" relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                <input
                  onClick={() => toggleStock(product._id, !product.inStock)}
                  type="checkbox"
                  className=" sr-only peer"
                  defaultChecked={product.inStock}
                />
                <div className="w-10 h-6 bg-surface rounded-full peer peer-checked:bg-accent transition-colors duration-200" />
                <span className=" absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
