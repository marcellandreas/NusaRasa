import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/ClerkWebhooks.js";

const port = process.env.PORT || 3000;

await connectDB();

const app = express();
app.use(cors());

// middleware setup
app.use(express.json());

// clrek
app.use(clerkMiddleware());

// api to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// route endpoint
app.get("/", (req, res) => res.send("Api Successfully Connected"));

// start
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
