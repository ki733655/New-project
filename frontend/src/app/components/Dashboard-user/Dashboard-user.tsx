"use client"
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { FaEdit } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Card, CardActions, CardContent } from '@mui/material';

const Dashboard_user = () => {
  const [data, setData] = useState({
    name: localStorage.getItem('user') || '',
    email: localStorage.getItem('email') || '',
  });

  const [inDateTime, setInDateTime] = useState(null);
  const [outDateTime, setOutDateTime] = useState(null);
  const [isInTimeDisabled, setIsInTimeDisabled] = useState(false);
  const [isOutTimeDisabled, setIsOutTimeDisabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('user');
    const storedEmail = localStorage.getItem('email');
    if (storedName || storedEmail) {
      setData({
        name: storedName || data.name,
        email: storedEmail || data.email,
      });
    }

    const checkButtonStatus = () => {
      const inTimeClicked = localStorage.getItem('inTimeClicked');
      const outTimeClicked = localStorage.getItem('outTimeClicked');
      const now = new Date().getTime();

      if (inTimeClicked && now - inTimeClicked < 12 * 60 * 60 * 1000) {
        setIsInTimeDisabled(true);
      }

      if (outTimeClicked && now - outTimeClicked < 12 * 60 * 60 * 1000) {
        setIsOutTimeDisabled(true);
      }
    };

    checkButtonStatus();
  }, [data.name, data.email]);

  const handleInTime = () => {
    const currentDateTime = new Date().toLocaleString();
    setInDateTime(currentDateTime);
    localStorage.setItem('inTimeClicked', new Date().getTime());
    setIsInTimeDisabled(true);
  };

  const handleOutTime = async () => {
    const currentDateTime = new Date().toLocaleString();
    setOutDateTime(currentDateTime);
    localStorage.setItem('outTimeClicked', new Date().getTime());
    setIsOutTimeDisabled(true);

    const dataToSend = {
      name: data.name,
      email: data.email,
      inTime: inDateTime,
      outTime: currentDateTime,
    };

    try {
      const response = await fetch('http://localhost:4000/add-from-user-dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Data successfully sent to backend:', result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout functionality here
    localStorage.clear();
    setData({ name: '', email: '' });
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <Avatar alt={data.name} src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: '20vw',  // Adjusted width
            height: '50vh', // Extended height
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
          <Typography variant="body1">Change your photo</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
          <Typography variant="body1">Name</Typography>
          <FaEdit />
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
          <Typography variant="body1">Email</Typography>
          <FaEdit />
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
          <Typography variant="body1">Logout</Typography>
          <MdLogout />
        </MenuItem>
      </Menu>
      <div style={{ padding: 16, display: "flex", gap: "2vw" }}>
        <Card style={{ width: "15vw", height: "17vh", padding : "2.5vh", backgroundColor : "#fafbfc" }}>
          <h1>Welcome {data.name}</h1>
          <h1>Email: {data.email}</h1>
        </Card>


        <Card style={{ width: "15vw", height: "17vh", padding : "2.5vh" ,backgroundColor : "#fafbfc" }}>
        
          <p className='inline'>Hit your</p>
          <Button style={{marginLeft : "1vw"}} variant="contained" onClick={handleInTime} disabled={isInTimeDisabled}>
            Intime
          </Button>
          <p>In Time: {inDateTime}</p>
        </Card>
        <Card style={{ width: "15vw", height: "17vh", padding : "2.5vh",backgroundColor : "#fafbfc" }}>
        
          <p className='inline'>Hit your</p>

          <Button style={{marginLeft : "1vw"}} variant="contained" onClick={handleOutTime} disabled={isOutTimeDisabled}>Outime</Button>
          <p>Out Time: {outDateTime}</p>
        </Card>

      </div>
    </>
  );
};

export default Dashboard_user;
