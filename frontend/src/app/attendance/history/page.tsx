"use client";
import React, { useEffect, useState } from "react";

const dummyData = [
  { date: "2025-07-01", checkIn: "09:10 AM", checkOut: "05:12 PM", status: "Present" },
  { date: "2025-06-30", checkIn: "09:45 AM", checkOut: "", status: "Half-day" },
  { date: "2025-06-29", checkIn: "", checkOut: "", status: "Absent" },
];

const AttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Simulate fetch from backend
    setAttendance(dummyData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">🕒 Attendance History</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Check-Out</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.checkIn || "—"}</td>
                  <td className="px-4 py-2">{item.checkOut || "—"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Half-day"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan={4}>
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
