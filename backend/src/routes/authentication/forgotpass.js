const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const userModel = require("../../models/user");

router.post("/submit-email-for-otp", async (req, res) => {
    try {
        // Extract email from request body
        const { email } = req.body;

        // Check if email provided
        if (!email) {
            return res.status(400).json({ error: "Email required" });
        } 

        // Generate a random 6-digit OTP
        const otp = crypto.randomInt(100000, 999999);

        // Configure the email transport using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service provider
            auth: {
                user: 'charlie2ishere@gmail.com', // Your email
                pass: 'charlie2isherenow'   // Your email password
            }
        });

        // Configure the email options
        const mailOptions = {
            from: 'charlie2ishere@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        // Send the email with OTP
        await transporter.sendMail(mailOptions);

        // Save the OTP and email in the database or cache (example using userModel)
        // await userModel.updateOne({ email }, { otp });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error while sending OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
