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

        // Create a test account and configure the email transport using Ethereal
        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "tiffany.volkman36@ethereal.email", // generated ethereal user
                pass: "K8PzU1xnAbxx7YgH7C"  // generated ethereal password
            }
        });

        // Configure the email options 
        const mailOptions = {
            from: '"Example Team',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        // Send the email with OTP
        let info = await transporter.sendMail(mailOptions);

        // Log the message ID and preview URL
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Save the OTP and email in the database or cache (example using userModel)
        // await userModel.updateOne({ email }, { otp });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error while sending OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
