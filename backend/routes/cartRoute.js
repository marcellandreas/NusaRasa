import express from "express";
import { addToCart, updateCart } from "../controllers/CartController.js";
import authUser from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
