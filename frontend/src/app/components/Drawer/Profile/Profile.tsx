"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Card, CardContent, Grid, Avatar, Paper, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// const userData = {
//   _id: "666a8b4090d43541f89bb1ee",
//   name: "Sohan",
//   email: "sohan@gmail.com",
//   password: "sohan",
//   select: "management",
//   empId: "s23",
//   inTime: [
//     "13/6/2024, 11:33:59 am",
//     "13/6/2024, 11:36:26 am",
//     "13/6/2024, 11:36:49 am",
//     "2024-06-24",
//     "2024-06-24",
//     "26/06/2024, 9:31:53 am",
//     "28/06/2024, 10:36:15 am"
//   ],
//   outTime: [
//     "13/6/2024, 11:34:00 am",
//     "13/6/2024, 11:36:27 am",
//     "13/6/2024, 11:36:50 am",
//     null,
//     null,
//     "26/06/2024, 9:31:55 am",
//     "28/06/2024, 10:36:18 am"
//   ],
//   __v: 7
// };


const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    select: "",
    empId: "",
    inTime: [],
    outTime: [],
  })

  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchProfileData = async (email) => {
      const url = new URL("http://localhost:4000/get-profile");
      url.searchParams.append('email', email);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully", data);


        setUserData({
          name: data.name,
          email: data.email,
          select: data.select,
          empId: data.empId,
          inTime: data.inTime,
          outTime: data.outTime,
        });


      } catch (error) {
        console.log("Error while fetching data", error);
      }

    }

    fetchProfileData(email);
  })


  return (

    <Box sx={{ padding: 4 }}>
      <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 3, backgroundColor: '#f9f9f9' }}>
        <CardContent>
            <Typography variant="h4" sx={{textAlign : "center"}} gutterBottom>Profile</Typography>
          <Grid container spacing={3}>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

              <Avatar sx={{ width: 120, height: 120 }}>

                <AccountCircleIcon sx={{ fontSize: 100 }} />
              </Avatar>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">Personal Information</Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                <Typography variant="body1"><strong>Department:</strong> {userData.select}</Typography>
                <Typography variant="body1"><strong>Employee ID:</strong> {userData.empId}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">In Times</Typography>
                <Divider sx={{ marginY: 1 }} />
                {userData.inTime.slice().reverse().map((time, index) => (
                  <Typography key={index} variant="body2">{time}</Typography>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">Out Times</Typography>
                <Divider sx={{ marginY: 1 }} />
                {userData.outTime.slice().reverse().map((time, index) => (
                  <Typography key={index} variant="body2">{time !== null ? time : 'N/A'}</Typography>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
