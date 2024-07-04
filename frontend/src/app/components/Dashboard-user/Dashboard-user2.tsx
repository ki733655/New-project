"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import{ AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Menu, MenuItem } from '@mui/material';
import CalendarComp from '../Calendar/CalendarComp';

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
};

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

  return (

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
  );
}