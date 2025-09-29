import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddressForm,
  Blog,
  Cart,
  Contact,
  Home,
  Menu,
  MyOrders,
} from "./pages";
import { Footer, Header } from "./components/navigation";

const App = () => {
  return (
    <main className=" overflow-x-hidden text-textColor">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
