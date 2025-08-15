"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarCheck,
  FaClock,
  FaSignOutAlt,
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
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ---------- Types ----------
type User = {
  name: string;
  email: string;
};

type AttendanceRecords = Record<string, "Present" | "Absent" | "Half-day">;

type SummaryData = {
  name: string;
  value: number;
};

const DashboardUser2: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState<string | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceCount, setAttendanceCount] = useState<number | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecords>({});
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [weeklySummaryData, setWeeklySummaryData] = useState<SummaryData[]>([]);
  const [isClient, setIsClient] = useState(false);

  const getStatus = (date: Date) => {
    const formatted = date.toLocaleDateString("en-CA");
    return attendanceRecords[formatted];
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const status = getStatus(date);
      if (status === "Present") return "react-calendar__tile--present";
      if (status === "Absent") return "react-calendar__tile--absent";
      if (status === "Half-day") return "react-calendar__tile--halfday";
    }
    return null;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoading(false);
    } else {
      return router.push("/login");
    }

    const userObj: User = JSON.parse(storedUser);
    setUser(userObj);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}me`, {
          withCredentials: true,
        });
        setProfilePic(res.data.profilePicUrl);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();

    const fetchTodayAttendance = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}attendance/today`, {
          withCredentials: true,
        });
        if (res.data) {
          const { checkIn, checkOut } = res.data;
          if (checkIn && checkOut) {
            setIsClockedIn(true);
            setHasClockedOut(true);
            setAttendanceStatus("Completed");
          } else if (checkIn && !checkOut) {
            setIsClockedIn(true);
            setHasClockedOut(false);
            setAttendanceStatus("Present");
          } else {
            setIsClockedIn(false);
            setHasClockedOut(false);
            setAttendanceStatus("Not Marked");
          }
        }
      } catch (err) {
        console.error("Failed to fetch today's attendance:", err);
        setAttendanceStatus("Error");
      }
    };
    fetchTodayAttendance();

    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}attendance/summary`, {
          withCredentials: true,
        });
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

    const fetchMonthlyAttendance = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}attendance/month/calendar`, {
          withCredentials: true,
        });
        setAttendanceRecords(res.data);
      } catch (err) {
        console.error("Failed to fetch monthly attendance:", err);
      }
    };
    fetchMonthlyAttendance();
  }, [hasClockedOut, router]);

  const handleClockIn = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}attendance/mark`,
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
        `${API_BASE_URL}attendance/mark`,
        { type: "checkout" },
        { withCredentials: true }
      );
      setIsClockedIn(false);
      setHasClockedOut(true);
      toast.success("✅ Clocked out successfully!");
    } catch (err) {
      toast.error("❌ Failed to clock out.");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}logout`, {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const COLORS = ["#23D16C", "#F87171", "#FBBF24"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        <ImSpinner4 className="animate-spin mr-2" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-green-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile and Logout */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={
                  profilePic ||
                  `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                }
                alt="Avatar" 
                className="w-20 h-20 rounded-full border"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">{user?.name}</p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaEnvelope /> {user?.email}
                </p>
                <button
                  onClick={() => router.push("/profile/edit")}
                  className="mt-2 px-4 py-1 bg-green-500 hover:bg-[#1EAE5A] text-white rounded-lg"
                >
                  Edit Profile
                </button>
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

          {/* Middle Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Attendance status */}
            <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-start gap-2">
              <FaClock className="text-green-500 text-3xl" />
              <p className="text-sm text-gray-500">Today&apos;s Status</p>
              <p className="text-xl font-bold">{attendanceStatus}</p>
              {!isClockedIn && !hasClockedOut ? (
                <button
                  onClick={handleClockIn}
                  className="mt-2 px-4 py-1 bg-green-500 hover:bg-green-700 text-white rounded-md"
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

            {/* Attendance records */}
            <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-start gap-2">
              <FaCalendarCheck className="text-green-500 text-3xl" />
              <p className="text-lg text-gray-500 font-bold">Attendance records</p>
              <p className="text-xl font-bold">{attendanceCount}</p>
              <button
                onClick={() => router.push("/attendance/history")}
                className="mt-2 px-4 py-1 bg-green-500 hover:bg-[#1EAE5A] text-white rounded-md"
              >
                View Records
              </button>
            </div>

            {/* Leaves */}
            <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-start gap-2">
              <FaCalendarCheck className="text-green-500 text-3xl" />
              <p className="text-lg font-bold text-gray-500">Leaves</p>
              <button
                onClick={() => router.push("/leave/apply")}
                className="mt-2 px-4 py-1 bg-green-500 hover:bg-[#1EAE5A] text-white rounded-md"
              >
                Apply for Leave
              </button>
              <button
                onClick={() => router.push("/leave/history")}
                className="mt-2 px-4 py-1 bg-green-500 hover:bg-[#1EAE5A] text-white rounded-md"
              >
                View Leave History
              </button>
            </div>
          </div>

          {/* Pie chart & Calendar */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">📅 Attendance Overview</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {isClient && (
                <>
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

                  <div className="bg-gray-50 p-4 rounded-xl shadow-inner border">
                    <Calendar
                      onChange={(value) => setSelectedDate(value as Date)}
                      value={selectedDate}
                      tileClassName={tileClassName}
                      className="rounded-lg border border-gray-200 w-full"
                    />
                    <p className="mt-4 text-sm text-gray-600">
                      Selected Date:{" "}
                      <strong>{selectedDate.toDateString()}</strong>
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
