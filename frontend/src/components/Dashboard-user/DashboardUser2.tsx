"use client";
import React, { useEffect, useState } from "react";
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


const DashboardUser2 = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  // to track clocked in or not 
  const [isClockedIn, setIsClockedIn] = useState(false);
  // to track clocked out or not
  const [hasClockedOut, setHasClockedOut] = useState(false);
  // calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  // to store the attendance count
  const [attendanceCount, setAttendanceCount] = useState(null);
  // to store the calendar data 
  const [attendanceRecords, setAttendanceRecords] = useState({});

 const getStatus = (date) => {
  const formatted = date.toLocaleDateString('en-CA'); // YYYY-MM-DD in local timezone
  return attendanceRecords[formatted];
};


  // to store the pie chart data
  const [weeklySummaryData, setWeeklySummaryData] = useState([]);

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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoading(false);
    }

    if (!storedUser) return router.push("/login");

    const userObj = JSON.parse(storedUser);
    setUser(userObj);

    // fethcing attendance 
    const fetchTodayAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:4000/attendance/today", {
          withCredentials: true, // 🔒 send cookies
        });

        if (res.data) {
          const { checkIn, checkOut } = res.data;

          if (checkIn && checkOut) {
            setIsClockedIn(true);
            setHasClockedOut(true);                 // No clock in/out anymore
            setAttendanceStatus("Completed");      // Fully marked
          } else if (checkIn && !checkOut) {
            setIsClockedIn(true);
            setHasClockedOut(false);                 // Show Clock Out
            setAttendanceStatus("Present");
          } else if (!checkIn && !checkOut) {
            setIsClockedIn(false);
            setHasClockedOut(false);                 // Show Clock In
            setAttendanceStatus("Not Marked");
          }
        }

      } catch (err) {
        console.error("Failed to fetch today's attendance:", err);
        setAttendanceStatus("Error");
      }
    };

    fetchTodayAttendance();

    // fetch for the pie chart
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:4000/attendance/summary", {
          withCredentials: true,
        });
        console.log("Monthly Summary:", res.data);
        setWeeklySummaryData([
          { name: "Present", value: res.data.Present },
          { name: "Leave", value: res.data.Leave },
          { name: "Absent", value: res.data.Absent },
        ]);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };
    fetchSummary();

    // fetch for the calendar
    const fetchMonthlyAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:4000/attendance/month/calendar", {
          withCredentials: true,
        });
        setAttendanceRecords(res.data);
      } catch (err) {
        console.error("Failed to fetch monthly attendance:", err);
      }
    };
    fetchMonthlyAttendance();


  }, [hasClockedOut]);


  const handleClockIn = async () => {
    try {
      await axios.post(
        "http://localhost:4000/attendance/mark",
        { type: "checkin" },
        { withCredentials: true }
      );

      setIsClockedIn(true);
      setHasClockedOut(false);
      setAttendanceStatus("Present");
      toast.success("✅ Clocked in successfully!");
    } catch (err) {
      toast.error("❌ Failed to clock in.");
      console.error(err);
    }
  };


  const handleClockOut = async () => {
    try {
      await axios.post(
        "http://localhost:4000/attendance/mark", // same as clock-in
        { type: "checkout" },
        { withCredentials: true }
      );

      setIsClockedIn(false); // user is now clocked out
      setHasClockedOut(true);
      toast.success("✅ Clocked out successfully!");
    } catch (err) {
      toast.error("❌ Failed to clock out.");
      console.error(err);
    }
  };


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed.");
    }
  };



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
          {/* PROFILE AND lOGOUT SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
            <div className="flex justify-between items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name || "User"}`}
                alt="Avatar"
                className="w-20 h-20 rounded-full border"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaEnvelope /> {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* MIDDILE SECTION*/}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-xl flex flex-col items-start gap-2">
              <FaClock className="text-blue-600 text-3xl" />
              <p className="text-sm text-gray-500">Today's Status</p>
              <p className="text-xl font-bold">{attendanceStatus}</p>
              {!isClockedIn && !hasClockedOut ? (
                <button
                  onClick={handleClockIn}
                  className="mt-2 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Clock In
                </button>
              ) : isClockedIn && !hasClockedOut ? (
                <button
                  onClick={handleClockOut}
                  className="mt-2 px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  Clock Out
                </button>
              ) : (
                <p className="text-green-600 font-bold">✅ Attendance marked</p>
              )}
            </div>


            <div className="bg-green-100 p-4 rounded-xl flex flex-col items-start gap-2">
              <FaCalendarCheck className="text-green-600 text-3xl" />
              <p className="text-sm text-gray-500">Click the below button to view your attendance records</p>
              <p className="text-xl font-bold">{attendanceCount}</p>
              <button
                onClick={() => router.push("/attendance/history")}
                className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md"
              >
                View Records
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
