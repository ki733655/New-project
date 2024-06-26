"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import CalendarComp from '../Calendar/CalendarComp';
//icons 
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';


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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const items = [
  { text: 'Profile', icon: <PersonIcon /> },
  { text: 'Documents', icon: <DescriptionIcon /> },
  { text: 'Pay Slip', icon: <PaymentIcon /> },
  { text: 'Setting', icon: <SettingsIcon /> },
];

export default function Dashboard_user2() {
  const [data, setData] = useState({
    name: localStorage.getItem('user') || '',
    email: localStorage.getItem('email') || '',
  });

  const [attendanceData, setAttendanceData] = useState({});
  const [inDateTime, setInDateTime] = useState(null);
  const [outDateTime, setOutDateTime] = useState(null);
  const [isInTimeDisabled, setIsInTimeDisabled] = useState(false);
  const [isOutTimeDisabled, setIsOutTimeDisabled] = useState(true); // Start with out time disabled
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


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
      if (inTimeClicked) {
        setIsInTimeDisabled(true);
      }
      const now = new Date().getTime();

      if (inTimeClicked && now - inTimeClicked < 12 * 60 * 60 * 1000) {
        setIsInTimeDisabled(true);
        setIsOutTimeDisabled(false); // Enable out time if in time is already clicked
      }

      if (outTimeClicked && now - outTimeClicked < 12 * 60 * 60 * 1000) {
        setIsOutTimeDisabled(true);
      }
    };

    checkButtonStatus();

    const fetchUserByEmail = async (email) => {
      const url = new URL('http://localhost:4000/get-attendance');
      url.searchParams.append('email', email);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data successfully retrieved:', data);

        // Format data
        const formattedData = {};
        Object.keys(data).forEach(key => {
          formattedData[key] = data[key];
        });
        setAttendanceData(formattedData);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchUserByEmail(data.email);

    // Interval to check for 3 PM auto absent declaration
    const checkAutoAbsent = setInterval(() => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDate = now.toISOString().split('T')[0];
      const outTimeClicked = localStorage.getItem('outTimeClicked');

      if (day !== 0 && day !== 6 && hours === 15 && minutes === 0 && !outTimeClicked) {
        handleAutoAbsent(currentDate);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkAutoAbsent); // Clear interval on component unmount
  }, [data.name, data.email]);

  useEffect(() => {
    console.log('Attendance Data:', attendanceData);
  }, [attendanceData]);

  const handleInTime = () => {
    const currentDateTime = new Date();
    const formattedCurrentDateTime = formatDateTime(currentDateTime);
    setInDateTime(formattedCurrentDateTime);
    localStorage.setItem('inTimeClicked', formattedCurrentDateTime);
    setIsInTimeDisabled(true);
    setIsOutTimeDisabled(false); // Enable out time after in time is clicked
  };

  const handleOutTime = async () => {
    const currentDateTime = new Date();
    const formattedCurrentDate = currentDateTime.toISOString().split('T')[0];

    try {
      const attendanceResponse = await fetch('http://localhost:4000/add-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          date: formattedCurrentDate,
          status: "present",
        }),
      });

      if (!attendanceResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const attendanceResult = await attendanceResponse.json();
      console.log('Attendance data successfully sent to backend:', attendanceResult);

      // Update local attendance data
      setAttendanceData(prevData => ({
        ...prevData,
        [formattedCurrentDate]: 'present'
      }));

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return; // Exit the function early if there's an error
    }

    const formattedOutDateTime = formatDateTime(currentDateTime); // Set the outDateTime after the first fetch
    setOutDateTime(formattedOutDateTime);
    localStorage.setItem('outTimeClicked', formattedOutDateTime);
    setIsOutTimeDisabled(true);

    try {
      const intimeOutimeResponse = await fetch('http://localhost:4000/add-intime-and-outime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          inTime: inDateTime,
          outTime: formattedOutDateTime,
        }),
      });

      if (!intimeOutimeResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const intimeOutimeResult = await intimeOutimeResponse.json();
      console.log('Intime and outime data successfully sent to backend:', intimeOutimeResult);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleAutoAbsent = async (currentDate) => {
    try {
      const response = await fetch('http://localhost:4000/add-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          date: currentDate,
          status: "absent",
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Absent data successfully sent to backend:', result);

      // Update local attendance data
      setAttendanceData(prevData => ({
        ...prevData,
        [currentDate]: 'absent'
      }));

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
    localStorage.clear();
    setData({ name: '', email: '' });
    handleMenuClose();
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt={data.name} src="/static/images/avatar/1.jpg" />
          </IconButton>
          {/* below code will be shown only when the avatar is clicked  */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: '10vw',
                height: '30vh',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Link href="/myprofile">
              <MenuItem sx={{ padding: '10px 20px' }} >
                <CgProfile className='mr-4 text-[20px]' />
                <Typography variant="body1">Profile</Typography>
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box style={{ padding: 16, display: "flex", gap: "2vw" }}>
        <Card style={{ width: "15vw", height: "17vh", padding: "2.5vh", backgroundColor: "#fafbfc" }}>
          <h1>Welcome {data.name}</h1>
          <h1>Email: {data.email}</h1>
        </Card>
        <Card style={{ width: "15vw", height: "17vh", padding: "2.5vh", backgroundColor: "#fafbfc" }}>
          <p className='inline'>Hit your</p>
          <Button style={{ marginLeft: "1vw" }} variant="contained" onClick={handleInTime} disabled={isInTimeDisabled}>
            In Time
          </Button>
          <p>In Time: {localStorage.getItem("inTimeClicked")}</p>
        </Card>
        <Card style={{ width: "15vw", height: "17vh", padding: "2.5vh", backgroundColor: "#fafbfc" }}>
          <p className='inline'>Hit your</p>
          <Button style={{ marginLeft: "1vw" }} variant="contained" onClick={handleOutTime} disabled={isOutTimeDisabled}>Out Time</Button>
          <p>Out Time: {localStorage.getItem("outTimeClicked")}</p>
        </Card>
        
        <CalendarComp attendance={attendanceData} />
      </Box>
      </Main>
    </Box>
  );
}