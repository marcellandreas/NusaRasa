import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/ClerkWebhooks.js";
import connectCloudinary from "./config/cloudinary.js";

// import router
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/StripeWebhooks.js";

const port = process.env.PORT || 3000;

await connectDB();
await connectCloudinary();

const app = express();
app.use(cors());

// api to listen to stripe webhooks
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// middleware setup
app.use(express.json());

// clrek
app.use(clerkMiddleware());

// api to listen clerk webhooks
app.post("/api/clerk", clerkWebhooks);

// route endpoint
app.get("/", (req, res) => res.send("Api Successfully Connected"));

// define api routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// start
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
