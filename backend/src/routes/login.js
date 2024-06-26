const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.post("/login-form", async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
      
        // Find user by email and password in the database
        const user = await userModel.findOne({ email, password });

        // If user not found, return authentication error
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }


        // If user found, you can handle successful login here
        // For now, let's just send back the user data
        res.status(200).json(user);
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
