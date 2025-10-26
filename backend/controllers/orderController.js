import transporter from "../middleware/nodeMailer.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import stripe from "stripe";

// global variabels for payment
const currency = "usd";
const delivery_charges = 10; // in dollars
const taxPercentage = 0.02; // 2%

// PLACE ORDER USING COD [POST '/COD']
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Please add Products first yaa!!!",
      });
    }

    // calculate amount using items
    let subtotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }

      const unitPrice = product.price[item.size]; // pick correct size
      if (!unitPrice) {
        return res.json({
          success: false,
          message: "Invalid size selected",
        });
      }

      subtotal += unitPrice * item.quantity;
    }

    // calculate total amount by adding tax and delivery charges
    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + delivery_charges;

    // create order in db
    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "COD",
    });

    //clear user for after placing order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // Send confirmation email for COD
    const populatedOrder = await Order.findById(order._id).populate(
      "items.product address"
    );
    const user = await User.findById(userId);

    const productTitles = populatedOrder.items
      .map((item) => item.product?.title || "Unknown")
      .join(", ");

    const addressString = populatedOrder.address
      ? `${populatedOrder.address.street || "N/A"}, ${
          populatedOrder.address.city || "N/A"
        }, ${populatedOrder.address.state || "N/A"}, ${
          populatedOrder.address.county || "N/A"
        }`
      : "No address";

    const mailOptions = {
      from: process.env.SMTP_SENDER_EMAIL,
      to: user.email,
      subject: `Order Details (COD)`,
      html: `
      <h2>Your Delivery Details</h2>
<p>Thank You for your Order! Below are your Order details:</p>
<ul>
  <li><strong>Order ID:</strong> ${populatedOrder._id}</li>
  <li><strong>Products Name:</strong> ${productTitles}</li>
  <li><strong>Address:</strong> ${addressString}</li>
  <li><strong>Total Amount:</strong> ${process.env.CURRENCY || "$"}${
        populatedOrder.amount
      }</li>
</ul>
<p>You will get your delivery soon. Pay on delivery.</p>

      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// PLACE ORDER USING Stripe [POST '/stripe']
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();
    const { origin } = req.headers;

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Please add Products first yaa!!!",
      });
    }

    // calculate amount using items
    let subtotal = 0;
    let productData = [];

    // calculate subtotal and prepare productData
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }

      const unitPrice = product.price[item.size]; // pick correct size
      if (!unitPrice) {
        return res.json({
          success: false,
          message: "Invalid size selected",
        });
      }

      subtotal += unitPrice * item.quantity;

      productData.push({
        name: product.title,
        price: unitPrice,
        quantity: item.quantity,
      });
    }

    // calculate total amount by adding tax and delivery charges
    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + delivery_charges;

    // create order in db
    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "stripe",
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // stripe line items
    let line_items = productData.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Tax
    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Tax (2%)" },
        unit_amount: Math.round(taxAmount * 100),
      },
      quantity: 1,
    });

    // Delivery charges
    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery  Charges (2%)" },
        unit_amount: Math.round(delivery_charges * 100),
      },
      quantity: 1,
    });

    //create stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/processing/my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("Stripe Error", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ALL ORDERS DATA FOR USER [GET '/']
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.auth();
    const orders = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ALL ORDERS DATA FOR ADMIN [POST '/status']
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, o) => acc + (o.isPaid ? o.amount : 0),
      0
    );
    res.json({
      success: true,
      dashboardData: { totalOrders, totalRevenue, orders },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// update order status for admin [POST '/status']
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
