import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CartTotal = () => {
  const {
    navigate,
    currency,
    method,
    setMethod,
    delivery_charges,
    getCartCount,
    getCartAmount,
    user,
    cartItems,
    setCartItems,
    products,
    axios,
    getToken,
  } = useAppContext();

  console.log("cart total", method);

  const [addresses, SetAddresses] = useState([]);
  const [showAddress, SetShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        SetAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // converto orderItems to items array for backend
      let items = orderItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
      }));

      // place order  using cod
      if (method === "COD") {
        const { data } = await axios.post(
          "/api/orders/cod",
          { items, address: selectedAddress._id },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        if (data.success) {
          setCartItems({}); // clear cart after cod
          navigate("/my-orders");
          toast.success(data.message);
          if (data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          "/api/orders/stripe",
          { items, address: selectedAddress._id },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, []);

  return (
    <div>
      <h3>
        Order Details
        <span className="text-sm font-bold text-accent-soft ml-2">
          {getCartCount()} Items
        </span>
      </h3>
      <hr className=" border-gray-300 my-5" />
      Payment & Addresses
      <div className=" mb-5">
        <div className=" my-5">
          <h4 className="mb-4">Where to ship your order?</h4>
          <div className=" relative flex justify-between items-start mt-2">
            <p>
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.country}`
                : "No Address found"}
            </p>
            <button
              onClick={() => SetShowAddress(!showAddress)}
              className="text-accent text-sm font-medium hover:underline cursor-pointer"
            >
              change
            </button>
            {showAddress && (
              <div className=" absolute top-10 py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      SetShowAddress(false);
                    }}
                    className=" p-2 cursor-pointer hover:bg-gray-100 text-sm font-medium"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/address-form");
                    scrollTo(0, 0);
                  }}
                  className=" p-2 text-center cursor-pointer hover:bg-tertiary hover:text-white"
                >
                  Add Address
                </p>
              </div>
            )}
          </div>
        </div>
        <hr className="border-gray-300 mt-5" />
        <div className="my-6">
          <h4 className="mb-5">Payment Method</h4>
          <div className="flex gap-3">
            <button
              onClick={() => setMethod("COD")}
              className={`${
                method === "COD" ? "btn-primary" : "btn-outline"
              } !py-2 !px-4 text-xs cursor-pointer`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setMethod("stripe")}
              className={`${
                method === "stripe" ? "btn-primary" : "btn-outline"
              } !py-2 !px-4 text-xs cursor-pointer`}
            >
              Stripe
            </button>
          </div>
        </div>
        <hr className="border-gray-300 mt-5" />
      </div>
      <div className=" mt-4 space-y-2">
        <div className="flex justify-between">
          <h5>Price</h5>
          <p className=" font-bold">
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Shipping Free</h5>
          <p className=" font-bold">
            {currency}
            {getCartAmount() === 0 ? "$0.00" : `${delivery_charges}.00`}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Tax (2%)</h5>
          <p className=" font-bold">
            {currency}
            {(getCartAmount() * 2) / 100}
          </p>
        </div>
        <div className="flex justify-between text-lg font-medium mt-3">
          <h4>Total Amount</h4>
          <p className=" font-bold text-lg">
            {currency}
            {getCartAmount() === 0
              ? "$0.00"
              : getCartAmount() +
                delivery_charges +
                (getCartAmount() * 2) / 100}
          </p>
        </div>
      </div>
      <button
        onClick={placeOrder}
        className="btn-primary w-full mt-8 !rounded-md py-2"
      >
        Proceed to orders
      </button>
    </div>
  );
};

export default CartTotal;
