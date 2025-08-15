"use client";
import * as React from 'react';
import { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import {  Menu} from '@mui/material';
import { MdHome, MdAccessTime, MdHistory, MdSettings } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb"; // Optional: Logout
import { BiCalendarCheck } from "react-icons/bi"; // Optional alternative for leave/attendance  
import axios from 'axios';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

import { usePathname } from 'next/navigation';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: '100vh',
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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const iconStyle = { color: '#0F572D', fontSize: '1.4rem' };


import { ReactNode } from "react";
interface MainLayoutProps {
  children: ReactNode;
}


export default function MainLayout({ children } : MainLayoutProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const [open, setOpen] = useState(false);


  const userMenu = [
    { text: "Home", icon: <MdHome style={iconStyle} />, url: "/dashboard/user" },
    { text: "View Attendance", icon: <MdAccessTime style={iconStyle} />, url: "/attendance/history" },
    { text: "Apply Leave", icon: <BiCalendarCheck style={iconStyle} />, url: "/leave/apply" },
    { text: "Show Leave", icon: <MdHistory style={iconStyle} />, url: "/leave/history" },
    { text: "Settings", icon: <FaUserEdit style={iconStyle} />, url: "/profile/edit" },
  ];

  const adminMenu = [
    { text: "Admin Dashboard", icon: <MdHome style={iconStyle} />, url: "/dashboard/admin" },
    { text: "Attendances", icon: <MdAccessTime style={iconStyle} />, url: "/admin/attendance" },
    { text: "Manage Users", icon: <PersonIcon style={iconStyle} />, url: "/admin/users/manage" },
    { text: "Create User", icon: <PersonIcon style={iconStyle} />, url: "/admin/users/create" },
  ];

  const logout = {
    text: "Logout",
    icon: <TbLogout2 style={iconStyle} />,
    action: async () => {
      try {
        await axios.post(`${API_BASE_URL}logout`, {}, { withCredentials: true });
        router.push("/login")
      } catch (err) {
        console.error("Logout failed", err);
        toast.error("Logout failed.");
      }
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
    } finally {
      setLoading(false); // Set loading to false after reading user data
    }
  }, []);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: 'linear-gradient(90deg,rgba(42, 155, 57, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%);' }}>
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
          <Box sx={{ flexGrow: 1 }} />
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
            backgroundColor: "#e6ffe6"
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
        {!loading && (
          <List>
            {user.role === "admin" && (
              <>
                <ListItem>
                  <ListItemText primary="User Panel" primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'gray' }} />
                </ListItem>
                {userMenu.map((item) => (
                  <ListItem disablePadding key={item.text}>
                    <ListItemButton
                      component={Link}
                      href={item.url}
                      selected={pathname === item.url}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: '#d1fae5',
                          '& .MuiListItemText-primary': { fontWeight: 'bold' },
                          '& .MuiListItemIcon-root': { color: '#065f46' },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="Admin Panel" primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'gray' }} />
                </ListItem>
                {adminMenu.map((item) => (
                  <ListItem disablePadding key={item.text}>
                    <ListItemButton
                      component={Link}
                      href={item.url}
                      selected={pathname === item.url}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: '#d1fae5',
                          '& .MuiListItemText-primary': { fontWeight: 'bold' },
                          '& .MuiListItemIcon-root': { color: '#065f46' },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            )}

            {user.role !== "admin" &&
              userMenu.map((item) => (
                <ListItem disablePadding key={item.text}>
                  <ListItemButton
                    component={Link}
                    href={item.url}
                    selected={pathname === item.url}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#d1fae5',
                        '& .MuiListItemText-primary': { fontWeight: 'bold' },
                        '& .MuiListItemIcon-root': { color: '#065f46' },
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}

            <Divider sx={{ my: 1 }} />

            <ListItem disablePadding>
              <ListItemButton onClick={logout.action}>
                <ListItemIcon>{logout.icon}</ListItemIcon>
                <ListItemText primary={logout.text} primaryTypographyProps={{ color: 'red', fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          </List>
        )}



      </Drawer>
      <Main open={open} sx={{ minHeight: '100vh', padding: 0 }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
