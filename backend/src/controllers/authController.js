const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { JWT_SECRET } = require("../config/config");
 
const register = async (req, res) => {
  const { name, email, password, role, empId } = req.body;

  if (!name || !email || !password || !empId) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Defaults to "user"
      empId,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        empId: newUser.empId,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token + user info
   const cookieOptions = {
  httpOnly: true,
  secure: true, // must be true in production
  sameSite: "none", // allow cross-site
  domain: ".trackmatee.vercel.app", // 👈 important
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
};

res.setHeader("Cache-Control", "no-store"); // 👈 prevent Vercel caching

res
  .cookie("token", token, cookieOptions)
  .cookie("role", user.role, {
    ...cookieOptions,
    httpOnly: false // role readable on frontend
  })
  .status(200)
  .json({
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("role");

  res.json({ message: "Logged out successfully" });
};

// to update profile and password
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // or req.params.id if using params
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update profile photo if uploaded
    if (req.file) {
      if (user.profilePhoto) {
        // Delete old image
        fs.unlink(`uploads/profile-photos/${user.profilePhoto}`, (err) => {
          if (err) console.log("Old image delete error:", err);
        });
      }
      user.profilePhoto = req.file.filename;
    }

    // Update password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
    console.log("profile updated");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const me = (req, res) => {
  try {
    const { _id, name, email, profilePhoto } = req.user;

    const profilePicUrl = profilePhoto
      ? `http://localhost:4000/uploads/profile-photos/${profilePhoto}`
      : ""; // Default/fallback if not set

    res.json({ _id, name, email, profilePicUrl });
    console.log(req.user);
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, logout, updateProfile, me };
