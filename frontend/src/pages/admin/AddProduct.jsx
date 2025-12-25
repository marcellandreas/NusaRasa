import React, { useState } from "react";
import { assets } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { currency, axios, getToken } = useAppContext();
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
    // inStock: true,
    //     images: "",
    // price: 0,
    // sizes: ["H", "F"],
    // date: 0,
  });

  const [sizePrices, setSizePrices] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const allCategories = [
    "Curry",
    "Rice",
    "Pizza",
    "Deserts",
    "Drinks",
    "Fruits",
  ];

  const allTypes = [
    "Chicken Curry",
    "Vegetable Curry",
    "Beef Curry",
    "Fish Curry",
    "Margherita",
    "Pepperoni",
    "BBQ Chicken",
    "Veggie",
    "Four Cheese",
    "Biryani",
    "Fried Rice",
    "Pulao",
    "Steamed Rice",
    "Cakes",
    "Pastries",
    "Brownies",
    "Fresh Juices",
    "Milkshakes",
    "Smoothies",
    "Soft Drinks",
    "Coffee",
    "Strawberries",
    "Apples",
    "Grapes",
    "Oranges",
    "Bananas",
  ];

  const addPrizeAdd = () => {
    if (!newSize || !newPrice) {
      toast.error("Please enter size and price");
      return;
    }
    if (sizePrices.some((sp) => sp.size === newSize)) {
      toast.error("Size Already exists");
      return;
    }
    setSizePrices([
      ...sizePrices,
      { size: newSize, price: parseFloat(newPrice) },
    ]);
    setNewPrice("");
    setNewSize("");
  };

  const removeSizePrice = (size) => {
    setSizePrices(sizePrices.filter((sp) => sp.size !== size));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !inputs.title ||
      !inputs.category ||
      !inputs.description ||
      !inputs.type
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (sizePrices.length === 0) {
      toast.error("Please add at least one size and price");
      return;
    }

    const hasImage = Object.values(images).some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please Upload at least one imagess");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const prices = {};
      const sizes = [];
      sizePrices.forEach((sp) => {
        prices[sp.price] = sp.price;
        sizes.push(sp.size);
      });

      const productData = {
        title: inputs.title,
        description: inputs.description,
        category: inputs.category,
        type: inputs.type,
        popular: inputs.popular,
        price: prices,
        sizes: sizes,
      };

      formData.append("productData", JSON.stringify(productData));

      // adding image  to formData
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const { data } = await axios.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.messages);
        // reset form after success
        setInputs({
          title: "",
          description: "",
          popular: false,
          category: "",
          type: "",
        });

        setNewPrice([]);
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll w-full lg:w-11/12 bg-primary shadow rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3.5 px-2 text-sm w-full lg:w-11/12"
      >
        <div className="w-full">
          <h5>Product Name</h5>
          <input
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
            type="text"
            placeholder="Type Here..."
            className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
          />
        </div>
        <div className=" w-full">
          <h5>Product Description</h5>
          <textarea
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            value={inputs.description}
            type="text"
            placeholder="Type Here..."
            rows={5}
            className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <h5>Category</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, category: e.target.value })
              }
              className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
              value={inputs.category}
            >
              <option value="">Select Category</option>
              {allCategories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Type</h5>
            <select
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
              value={inputs.type}
              className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
            >
              <option value="">Select Type</option>
              {allTypes.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* select price */}
        <div className="w-full mt-4">
          <h5>Size and Prices</h5>
          <div className="flex gap-4 mt-2">
            <input
              onChange={(e) => setNewSize(e.target.value)}
              type="text"
              placeholder="Size (e.g. S,M,L,XL,H,F)"
              value={newSize}
              className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
            />
            <input
              onChange={(e) => setNewPrice(e.target.value)}
              type="number"
              placeholder="Price"
              value={newPrice}
              className=" px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 text-sm font-medium mt-1 w-full"
            />
            <button
              onClick={addPrizeAdd}
              type="button"
              className="btn-primary font-semibold pb-1.5 rounded-lg flexCenter"
            >
              Add
            </button>
          </div>
          <div className=" mt-2">
            {sizePrices.map((sp, index) => (
              <div key={index} className="flexStart gap-2">
                <h4 className=" ">
                  {sp.size}: {currency}
                  {sp.price}
                </h4>
                <button
                  onClick={() => {
                    removeSizePrice(sp.size);
                  }}
                  type="button"
                  className=" text-red-600 ml-2 cursor-pointer font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* images */}
          <div className="flex gap-2 mt-2">
            {Object.keys(images).map((key, i) => (
              <label
                htmlFor={`productImage${key}`}
                key={i}
                className=" ring-1 ring-slate-900/10 overflow-hidden rounded-lg"
              >
                <input
                  type="file"
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                  accept="image/*"
                  id={`productImage${key}`}
                  hidden
                  className=""
                />
                <div className=" h-16 w-22 bg-white flexCenter">
                  <img
                    src={
                      images[key]
                        ? URL.createObjectURL(images[key])
                        : assets.uploadIcon
                    }
                    alt=""
                    className="w-17 overflow-hidden object-contain"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <h5>Add to Popular</h5>
          <input
            type="checkbox"
            checked={inputs.popular}
            onChange={(e) =>
              setInputs({ ...inputs, popular: e.target.checked })
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary font-semibold mt-3 p-2 max-w-36 sm:w-full rounded-xl"
        >
          {loading ? "Adding" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
