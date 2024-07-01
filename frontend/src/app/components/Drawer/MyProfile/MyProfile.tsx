"use client"
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Card, CardContent, Grid, Avatar, Paper, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const userData = {
  _id: "666a8b4090d43541f89bb1ee",
  name: "Sohan",
  email: "sohan@gmail.com",
  password: "sohan",
  select: "management",
  empId: "s23",
  inTime: [
    "13/6/2024, 11:33:59 am",
    "13/6/2024, 11:36:26 am",
    "13/6/2024, 11:36:49 am",
    "2024-06-24",
    "2024-06-24",
    "26/06/2024, 9:31:53 am",
    "28/06/2024, 10:36:15 am"
  ],
  outTime: [
    "13/6/2024, 11:34:00 am",
    "13/6/2024, 11:36:27 am",
    "13/6/2024, 11:36:50 am",
    null,
    null,
    "26/06/2024, 9:31:55 am",
    "28/06/2024, 10:36:18 am"
  ],
  __v: 7
};

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));


const MyProfile = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <Main open= {open}>
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 3, backgroundColor: '#f9f9f9' }}>
        <CardContent>
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
                {userData.inTime.map((time, index) => (
                  <Typography key={index} variant="body2">{time}</Typography>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">Out Times</Typography>
                <Divider sx={{ marginY: 1 }} />
                {userData.outTime.map((time, index) => (
                  <Typography key={index} variant="body2">{time !== null ? time : 'N/A'}</Typography>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
    </Main>
  );
};

export default MyProfile;
