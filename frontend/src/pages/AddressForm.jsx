import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import CartTotal from "../components/Cart/CartTotal";
import Title from "../components/ui/Title";
import toast from "react-hot-toast";

function AddressForm() {
  const { navigate, user, axios, getToken } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/address/add",
        { address },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);
  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      {/* container */}
      <div className="flex flex-col xl:flex-row xl:gap-28">
        {/* left side */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-[2] flex-col gap-3 text-[95%]"
        >
          <Title
            title1={"Delivery"}
            title2={"Information"}
            titleStyles={"pb-5"}
          />
          <div className="flex gap-3">
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.firstName}
              name="firstName"
              placeholder="First Name"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.lastName}
              name="lastName"
              placeholder="Last Name"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>
          <input
            type="email"
            onChange={onChangeHandler}
            value={address.email}
            name="email"
            placeholder="Email"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none "
          />
          <input
            type="text"
            onChange={onChangeHandler}
            value={address.phone}
            name="phone"
            placeholder="Phone"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none "
          />
          <input
            type="text"
            onChange={onChangeHandler}
            value={address.street}
            name="street"
            placeholder="Street"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none "
          />
          <div className="flex gap-3">
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.city}
              name="city"
              placeholder="City"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.state}
              name="state"
              placeholder="State"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.zipcode}
              name="zipcode"
              placeholder="Zipcode"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
            <input
              type="text"
              onChange={onChangeHandler}
              value={address.country}
              name="country"
              placeholder="Country"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>
          <button type="submit" className=" btn-solid rounded-md w-1/2 mt-2">
            Add Address
          </button>
        </form>
        {/* right side */}
        <div className="flex flex-1 flex-col">
          <div className="max-w-[379px] w-full bg-white p-5 py-10 max-md:mt-16 rounded-xl">
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
