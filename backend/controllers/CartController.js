import User from "../models/User.js";

// ADDING TO CART  ['POST' | '/ADD']
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const { userId } = req.auth();

    const userData = await User.findById(userId);
    const cartData = (await userData.cartData) || {}; // initialze

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update The Cart [post '/update']
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const { userId } = req.auth();

    const userData = await User.findById(userId);
    const cartData = (await userData.cartData) || {}; // initialze

    if (quantity <= 0) {
      delete cartData[itemId][size]; // hapus ketika cartdata 0
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = quantity;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
