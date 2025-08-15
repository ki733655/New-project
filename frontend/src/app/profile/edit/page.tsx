"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  name: string;
  email: string;
  profilePicUrl: string;
  // add more fields if needed
}

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(`${API_BASE_URL}me`, {
          withCredentials: true,
        });
        setUser(res.data);
        setPreviewUrl(res.data.profilePicUrl);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData();
      if (profilePic) formData.append("profilePhoto", profilePic);
      if (password) formData.append("password", password);

      const res = await axios.put(`${API_BASE_URL}update/profile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setPassword("");
      setConfirmPass("");
      setProfilePic(null);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img
                src={previewUrl || "/default-avatar.png"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <span className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full">
                <PencilIcon className="h-5 w-5 text-gray-600" />
              </span>
            </label>
            <input
              id="fileInput"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
