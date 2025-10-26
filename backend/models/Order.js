import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    items: [
      {
        product: { type: String, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, require: true, ref: "Address" },
    status: { type: String, default: "Order Placed" },
    paymentMethod: { type: String, require: true },
    isPaid: { type: Boolean, require: true, default: false },
  },
  { timestamps: true, minimize: false }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
