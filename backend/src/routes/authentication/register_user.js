const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user"); 
const router = express.Router();


router.post("/register-user", async (req, res) => {
  const { name, email, password, role, empId } = req.body;

  if (!name || !email || !password || !empId) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",  // Defaults to "user"
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
});

module.exports = router;
