const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const userModel = require("../../models/user");

router.post("/submit-email-for-otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email required" });
        }

        const otp = crypto.randomInt(100000, 999999);

        // Configure the email transport using a real SMTP server (e.g., Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can also use other services like 'SendGrid'
            auth: {
                user: 'charlie2ishere@gmail.com', // Replace with your actual email
                pass: 'Charlie2ishere@09/12'  // Replace with your actual password
            }
        });

        const mailOptions = {
            from: '"Example Team" <your-email@gmail.com>', // Sender address
            to: email, // List of receivers
            subject: 'Your OTP Code', // Subject line
            text: `Your OTP code is ${otp}` // Plain text body
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);

        // Save the OTP and email in the database or cache
        // await userModel.updateOne({ email }, { otp });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error while sending OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
