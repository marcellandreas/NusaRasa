import stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";

// Handle Stripe webhooks
export const stripeWebhooks = async (req, res) => {
  // stripe gateway initialze
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    // getting session metadata
    const session = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentId,
    });
    const { orderId, userId } = session.data[0].metadata;

    // mark orders as paid
    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    // clear user cart
    await User.findByIdAndUpdate(userId, { cartData: {} });
  } else {
    console.log("Unhandle event Type: ", event.type);
  }

  res.json({ received: true });
};
