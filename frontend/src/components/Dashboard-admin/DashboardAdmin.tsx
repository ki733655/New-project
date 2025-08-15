"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ---------- Types ----------
interface Stats {
  totalEmployees: number;
  present: number;
  absent: number;
  onLeave: number;
}

interface BarDataItem {
  day: string;
  Present: number;
  Absent: number;
}

interface LeaveRequest {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
}

// ---------- Component ----------
const DashboardAdmin: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalEmployees: 0,
    present: 0,
    absent: 0,
    onLeave: 0,
  });

  const [barData, setBarData] = useState<BarDataItem[]>([]);
  const [leaveData, setLeaveData] = useState<LeaveRequest[]>([]);

  const handleLeaveAction = async (
    id: string,
    action: "Approved" | "Rejected"
  ) => {
    try {
      await axios.put(
        `${API_BASE_URL}leave/${id}/status`,
        { status: action },
        { withCredentials: true }
      );

      setLeaveData((prev) => prev.filter((leave) => leave.id !== id));
      toast.success(`Leave ${action}`);
    } catch (err) {
      console.error("Error updating leave status", err);
      alert("Failed to update leave status");
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get<Stats>(
          `${API_BASE_URL}dashboard/admin/stats`,
          { withCredentials: true }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };

    const fetchBarData = async () => {
      try {
        const res = await axios.get<BarDataItem[]>(
          `${API_BASE_URL}dashboard/admin/barGraph`,
          { withCredentials: true }
        );
        setBarData(res.data);
      } catch (err) {
        console.error("Error fetching bar data", err);
      }
    };

    const fetchLeaveData = async () => {
      try {
        const res = await axios.get<LeaveRequest[]>(
          `${API_BASE_URL}leave/all`,
          { withCredentials: true }
        );
        setLeaveData(res.data);
      } catch (err) {
        console.error("Error fetching leave data", err);
      }
    };

    fetchStats();
    fetchBarData();
    fetchLeaveData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4">
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
          <h2 className="text-xl font-bold mb-4">
            📊 Weekly Attendance Summary
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
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
          <h2 className="text-xl font-bold mb-4">
            🧾 Pending Leave Requests
          </h2>
          {leaveData.length === 0 ? (
            <p className="text-gray-500">No pending requests.</p>
          ) : (
            <ul className="space-y-4">
              {leaveData.map((leave) => (
                <li
                  key={leave.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{leave.name}</p>
                    <p className="text-sm text-gray-600">
                      {leave.toDate} - {leave.fromDate} --- {leave.reason}
                    </p>
                  </div>
                  <button
                    onClick={() => handleLeaveAction(leave.id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleLeaveAction(leave.id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
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
