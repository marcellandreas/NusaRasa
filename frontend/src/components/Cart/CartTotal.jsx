import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { dummyAddress } from "../../assets/data";

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
  } = useAppContext();

  const [addresses, SetAddresses] = useState(dummyAddress);

  console.log(addresses);
  const [showAddress, SetShowAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div>
      <h3>
        Order Details
        <span className=" text-sm font-bold text-solid">
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
              className=" text-solid text-sm font-medium hover:underline cursor-pointer"
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
          <div className=" flex gap-3">
            <div
              onClick={() => setMethod("COD")}
              className={`${
                method === "COD" ? "btn-solid" : "btn-light"
              } !py-2 text-xs cursor-pointer`}
            >
              Cash on Delivery
            </div>
            <div
              onClick={() => setMethod("stripe")}
              className={`${
                method === "stripe" ? "btn-solid" : "btn-light"
              } !py-2 text-xs cursor-pointer`}
            >
              Stripe
            </div>
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
      <button className=" btn-solid w-full mt-8 !rounded-md py-2">
        Proceed to orders
      </button>
    </div>
  );
};

export default CartTotal;
