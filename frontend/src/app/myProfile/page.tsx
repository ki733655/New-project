"use client";
import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";

const dummyUser = {
  name: "Khairul Islam",
  email: "khairul@example.com",
  phone: "9876543210",
  role: "Employee",
};

const ProfilePage = () => {
  const [user, setUser] = useState(dummyUser);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  useEffect(() => {
    setTempUser(user); // Ensure sync when page loads
  }, [user]);

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUserEdit className="text-blue-500" /> Profile Information
        </h1>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={tempUser.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            ) : (
              <p className="mt-1">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-600">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={tempUser.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            ) : (
              <p className="mt-1">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-gray-600">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Edit Profile  
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
