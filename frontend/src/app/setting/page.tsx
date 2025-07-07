"use client";
import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaTrash } from "react-icons/fa";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {[
            { key: "profile", label: "👤 Profile" },
            { key: "security", label: "🔒 Security" },
            { key: "notifications", label: "🔔 Notifications" },
            { key: "others", label: "⚙️ Others" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`mr-4 pb-2 border-b-2 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Update Profile Info</h2>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="you@example.com"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Change Password</h2>
              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Update Password
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Alerts</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              </div>
            </div>
          )}

          {activeTab === "others" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
              <p className="text-sm text-gray-600">
                Deleting your account will remove all data. This cannot be undone.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                🗑️ Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
