import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { getAddress, addAddress } from "../controllers/AddressController.js";

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/", authUser, getAddress);

export default addressRouter;
