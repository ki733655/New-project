"use client"
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [otpSubmitted, setOtpSubmitted] = useState(false);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // api call
        try {
            const submitEmail = fetch("http://localhost:4000/submit-email-for-otp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            })

            console.log('email successfully sent to backend:', submitEmail);


        } catch (error) {
            console.log("Error sending data", error);
        }

        console.log('Email submitted:', email);
        setSubmitted(true);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to verify the OTP
        console.log('OTP submitted:', otp);
        setOtpSubmitted(true);
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Forgot Password
                </Typography>
                {otpSubmitted ? (
                    <Typography variant="body1">
                        Your password has been successfully reset. Please check your email for further instructions.
                    </Typography>
                ) : submitted ? (
                    <form onSubmit={handleOtpSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="OTP"
                            name="otp"
                            autoComplete="otp"
                            autoFocus
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Verify OTP
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleEmailSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Send OTP
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default ForgotPassword;
