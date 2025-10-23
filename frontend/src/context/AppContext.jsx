import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [method, SetMethod] = useState("COD");

  const [isOwner, setIsOwner] = useState(false);

  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 10;
  const navigate = useNavigate();
  // clerk
  const { user } = useUser();
  const { getToken } = useAuth();

  // get the user profile

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "owner");
        setCartItems(data.cartData || {});
      } else {
        // Retry fetch user details after 5 sec
        setTimeout(() => {
          getUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch all products
  const fecthProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Please select a size first");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
  };

  // get cart count
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // getCartAmount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price[size] * cartItems[itemId][size];
      }
    }
    return total;
  };

  // update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    fecthProducts();
  }, []);

  const value = {
    user,
    products,
    fecthProducts,
    currency,
    navigate,
    delivery_charges,
    searchQuery,
    setSearchQuery,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    cartItems,
    getCartAmount,
    method,
    SetMethod,
    isOwner,
    setIsOwner,
    axios,
    getToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
