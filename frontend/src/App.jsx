import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import SideBar from "./components/owner/SideBar";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/ListProduct";
import AddProduct from "./pages/admin/AddProduct";
import Processing from "./pages/Processing";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <main className=" overflow-x-hidden text-textColor">
      {!isOwnerPath && <Header />}
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/processing/:nextUrl" element={<Processing />} />
        <Route path="/owner" element={<SideBar />}>
          <Route index element={<Dashboard />} />
          <Route path="/owner/add-product" element={<AddProduct />} />
          <Route path="/owner/list-product" element={<ListProduct />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </main>
  );
};

export default App;
