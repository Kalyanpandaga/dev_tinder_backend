const JWT_PRIVATE_KEY = "Dev@TInder123";

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("invalid authentication token");
    }

    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const { userId } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
module.exports = { userAuth };
