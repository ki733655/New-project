"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  FaCalendarCheck,
  FaClock,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { ImSpinner4 } from "react-icons/im";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// calendar 
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";

const attendanceRecords = {
  "2025-07-01": "Present",
  "2025-07-02": "Absent",
  "2025-07-03": "Present",
  "2025-07-04": "Half-day",
};




const DashboardUser2 = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  // calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getStatus = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return attendanceRecords[formatted];
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const status = getStatus(date);
      if (status === "Present") return 'react-calendar__tile--present';
      if (status === "Absent") return 'react-calendar__tile--absent';
      if (status === "Half-day") return 'react-calendar__tile--halfday';
    }
    return null;
  };


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setLoading(false);
        fetchTodayAttendance(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  const fetchTodayAttendance = async (userId) => {
    try {
      const res = await axios.get(`/api/attendance/today/${userId}`);
      if (res.data && res.data.checkIn) {
        setIsClockedIn(true);
        setAttendanceStatus("Present");
      } else {
        setAttendanceStatus("Not Marked");
      }
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
    }
  };

  const handleClockIn = async () => {
    try {
      await axios.post("/api/attendance/mark", { type: "checkin" });
      setIsClockedIn(true);
      setAttendanceStatus("Present");
      toast.success("✅ Clocked in successfully!");
    } catch (err) {
      toast.error("❌ Failed to clock in.");
      console.error(err);
    }
  };

  const handleClockOut = async () => {
    try {
      await axios.post("/api/attendance/mark", { type: "checkout" });
      setIsClockedIn(false);
      toast.success("✅ Clocked out successfully!");
    } catch (err) {
      toast.error("❌ Failed to clock out.");
      console.error(err);
    }
  };


  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  // dummy data for chart 
  const weeklySummaryData = [
    { name: "Present", value: 5 },
    { name: "Absent", value: 1 },
    { name: "Leave", value: 1 },
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);




  const COLORS = ["#34D399", "#F87171", "#FBBF24"]; // green, red, yellow


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        <ImSpinner4 className="animate-spin mr-2" />
        Loading your dashboard...
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 p-6">



        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {user.name || "User"} 👋
              </h1>
              <p className="text-gray-600 text-sm">Role: {user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name || "User"}`}
              alt="Avatar"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-gray-600 flex items-center gap-2">
                <FaEnvelope /> {user.email}
              </p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-xl flex flex-col items-start gap-2">
              <FaClock className="text-blue-600 text-3xl" />
              <p className="text-sm text-gray-500">Today's Status</p>
              <p className="text-xl font-bold">{attendanceStatus}</p>
              {!isClockedIn ? (
                <button
                  onClick={handleClockIn}
                  className="mt-2 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Clock In
                </button>
              ) : (
                <button
                  onClick={handleClockOut}
                  className="mt-2 px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  Clock Out
                </button>
              )}
            </div>

            <div className="bg-green-100 p-4 rounded-xl flex flex-col items-start gap-2">
              <FaCalendarCheck className="text-green-600 text-3xl" />
              <p className="text-sm text-gray-500">Total Presents</p>
              <p className="text-xl font-bold">23</p>
              <button
                onClick={() => router.push("/attendance/history")}
                className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md"
              >
                View Attendance history
              </button>


            </div>



            <div className="bg-yellow-100 p-4 rounded-xl flex flex-col items-start gap-2">
              <FaCalendarCheck className="text-yellow-600 text-3xl" />
              <p className="text-sm text-gray-500">Leaves Taken</p>
              <p className="text-xl font-bold">4</p>
              <button
                onClick={() => router.push("/leave/apply")}
                className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded-md">
                Apply for Leave
              </button>
              <button
                onClick={() => router.push("/leave/history")}
                className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-md"
              >
                View Leave History
              </button>
            </div>
          </div>

          {/* Activity Log (placeholder for now) */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Clocked in at 9:10 AM</li>
              <li>Clocked out at 5:12 PM</li>
              <li>Applied for leave on 27 June</li>
            </ul>
          </div>

          {/* pie chart and calendar section  */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">📅 Attendance Overview</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {isClient && (
                <>

                  {/* Pie Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={weeklySummaryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {weeklySummaryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Calendar */}
                  <div className="bg-gray-50 p-4 rounded-xl shadow-inner border">
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      tileClassName={tileClassName}
                      className="rounded-lg border border-gray-200 w-full"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                      Selected Date: <strong>{selectedDate.toDateString()}</strong><br />
                      Status:{" "}
                      <span className="font-semibold">
                        {getStatus(selectedDate) || "No data"}
                      </span>
                    </p>
                  </div>
                </>
              )}


            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default DashboardUser2;
