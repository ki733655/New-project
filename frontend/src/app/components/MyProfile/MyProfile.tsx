"use client"
import React, { useState } from 'react'
const MyProfile = () => {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('Web Developer');
    const [avatar, setAvatar] = useState('/avatar.jpg'); // Default avatar
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleBioChange = (e) => {
      setBio(e.target.value);
    };
  
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src={avatar}
              alt="Profile Picture"
            />
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-gray-600">{bio}</p>
            </div>
          </div>
          <div className="mt-4">
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="w-full px-3 py-2 border rounded-md resize-none"
              rows="4"
              placeholder="Enter your bio"
            ></textarea>
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-bold">Change Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
  )
}

export default MyProfile;