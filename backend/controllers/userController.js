// get profile user

export const getUserProfile = (req, res) => {
  try {
    const role = req.user.role;
    const cartData = req.user.cartData;
    console.log({ success: true, role, cartData })
    res.json({ success: true, role, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
