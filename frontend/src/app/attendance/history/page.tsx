"use client";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";


const AttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);

  // Replace with real user data in actual app
  const user = { name: "Aiyan", email: "aiyan@gmail.com" };

  useEffect(() => {

    const fetchAttendanceRecords = async () => {
      try {
        const res = await axios.get("http://localhost:4000/attendance/records", {
          withCredentials: true, // 🔒 send cookies
        });

        setAttendance(res.data);
        console.log(res);

      } catch (err) {
        console.error("Failed to attendance records:", err);
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Prepare CSV export data
  const csvData = attendance.map((item) => ({
    name: user.name,
    email: user.email,
    date: item.date,
    checkIn: item.checkIn || "--",
    checkOut: item.checkOut || "--",
    status: item.status,
  }));

  const csvHeaders = [
    { label: "Employee Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Date", key: "date" },
    { label: "Check In", key: "checkIn" },
    { label: "Check Out", key: "checkOut" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📋 Attendance Records</h2>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={"attendance-report.csv"}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Export CSV
          </CSVLink>
        </div>

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
                  <td
                    className="px-4 py-4 text-center text-gray-500"
                    colSpan={4}
                  >
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
