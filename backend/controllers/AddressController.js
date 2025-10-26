import Address from "../models/Address.js";

// ADD ADDRESS FOR USER ['POST' | '/ADD']
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req.auth();
    await Address.create({ ...address, userId });

    res.json({ success: true, message: "Address Create successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
// GET ADDRESS FOR USER ['GET' | '/']
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.auth();
    const addresses = await Address.find({ userId }).sort({ createAt: -1 });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
