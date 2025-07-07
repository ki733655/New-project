"use client";
import React from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaUmbrellaBeach,
  FaListUl,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const DashboardAdmin = () => {
  // Dummy stats
  const stats = {
    totalEmployees: 32,
    present: 26,
    absent: 4,
    onLeave: 2,
  };

  const pendingLeaves = [
    { id: 1, name: "Aiyan Khan", date: "2025-07-01", reason: "Sick leave" },
    { id: 2, name: "Zara Ali", date: "2025-07-02", reason: "Family function" },
  ];



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
            <FaUsers className="text-blue-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-xl font-bold">{stats.totalEmployees}</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-xl flex items-center gap-4">
            <FaCheckCircle className="text-green-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-500">Present Today</p>
              <p className="text-xl font-bold">{stats.present}</p>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-xl flex items-center gap-4">
            <FaTimesCircle className="text-red-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <p className="text-xl font-bold">{stats.absent}</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl flex items-center gap-4">
            <FaUmbrellaBeach className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-xl font-bold">{stats.onLeave}</p>
            </div>
          </div>
        </div>

        {/* Weekly Summary Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">📊 Weekly Attendance Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { day: "Mon", Present: 25, Absent: 5 },
              { day: "Tue", Present: 28, Absent: 2 },
              { day: "Wed", Present: 30, Absent: 0 },
              { day: "Thu", Present: 27, Absent: 3 },
              { day: "Fri", Present: 29, Absent: 1 },
              { day: "Sat", Present: 26, Absent: 4 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Present" fill="#4ade80" />
              <Bar dataKey="Absent" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        {/* Pending Leaves Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">🧾 Pending Leave Requests</h2>
          {pendingLeaves.length === 0 ? (
            <p className="text-gray-500">No pending requests.</p>
          ) : (
            <ul className="space-y-4">
              {pendingLeaves.map((leave) => (
                <li
                  key={leave.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{leave.name}</p>
                    <p className="text-sm text-gray-600">
                      {leave.date} - {leave.reason}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
