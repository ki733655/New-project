"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Define a type for attendance entries
interface AttendanceEntry {
  userId?: {
    name?: string;
    email?: string;
  };
  date?: string;
  checkIn?: string;
  checkOut?: string;
  status?: string;
}

const AdminAttendanceFilter: React.FC = () => {
  const [data, setData] = useState<AttendanceEntry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await axios.get<AttendanceEntry[]>(
          `${API_BASE_URL}attendance/all`,
          { withCredentials: true }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []); // ✅ fixed dependency array

  const filtered = data.filter((entry) => {
    const nameMatch =
      entry.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      entry.userId?.email?.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter ? entry.status === statusFilter : true;

    const dateMatch =
      (!fromDate || (entry.date ?? "") >= fromDate) &&
      (!toDate || (entry.date ?? "") <= toDate);

    return nameMatch && statusMatch && dateMatch;
  });

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "—";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">🔍 Attendance Filter Panel</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half-day">Half-day</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center p-4 text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center p-4 text-red-500">{error}</p>
          ) : (
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Check-In</th>
                  <th className="px-4 py-2">Check-Out</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{entry.userId?.name || "—"}</td>
                    <td className="px-4 py-2">{entry.userId?.email || "—"}</td>
                    <td className="px-4 py-2">
                      {formatDate(entry.date) || "—"}
                    </td>
                    <td className="px-4 py-2">{entry.checkIn || "—"}</td>
                    <td className="px-4 py-2">{entry.checkOut || "—"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          entry.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : entry.status === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 p-4">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAttendanceFilter;
