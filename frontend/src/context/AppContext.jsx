import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 10;
  const navigate = useNavigate();
  // clerk
  const { user } = useUser();

  const fecthProducts = () => {
    setProducts(dummyProducts);
  };

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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
