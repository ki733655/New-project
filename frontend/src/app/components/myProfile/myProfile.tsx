'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Input = styled('input')({
  display: 'none',
});

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    select: "",
    empId: "",
    bio: "",
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
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
          bio: data.bio,
        });
        console.log("Profile Image URL: ", data.img);
        setPreviewImage(data.img);

      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };

    fetchProfileData(email);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", profileImage);
    formData.append("bio", userData.bio);

    console.log(formData);

    try {
      const response = await fetch(`http://localhost:4000/upload/${userData.email}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('File uploaded successfully', data);

    } catch (error) {
      console.error('Error while uploading file:', error);
    }

    try {
      const updateResponse = await fetch(`http://localhost:4000/update-myprofile/${userData.email}`, {
        method: 'PUT',
        body: formData,
      });

      if (!updateResponse.ok) {
        throw new Error(`Network response was not ok: ${updateResponse.statusText}`);
      }

      const updateData = await updateResponse.json();
      console.log('Profile updated successfully', updateData);

    } catch (error) {
      console.error('Error while updating profile:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Box position="relative">
          <Avatar
            src={previewImage}
            sx={{ width: 120, height: 120 }}
          />
          <label htmlFor="profile-image-upload">
            <Input
              accept="image/*"
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <EditIcon />
            </IconButton>
          </label>
        </Box>
        <Box mt={3} width="100%">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={userData.name}
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={userData.email}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Designation"
            name="select"
            value={userData.select}
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Employee ID"
            name="empId"
            value={userData.empId}
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={userData.bio}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box mt={2} textAlign="center">
            <Button
              onClick={submitData}
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Save Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
