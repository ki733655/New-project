const jwt = require("jsonwebtoken");
const User = require("../models/user.js"); // use .js if using ES Modules

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Invalid user" });

    req.user = user; // 👈 this line is crucial
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Authentication failed" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = {authenticate , adminOnly};
