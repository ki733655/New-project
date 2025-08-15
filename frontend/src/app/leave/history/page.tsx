"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Type for a single leave record
interface LeaveRecord {
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Approved" | "Pending" | "Rejected" | string;
}

const LeaveHistoryPage: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get<LeaveRecord[]>(
          `${API_BASE_URL}leave/user/history`,
          { withCredentials: true }
        );
        setLeaves(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaveData();
  }, []);

  // ✅ Date formatting with correct param type
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const csvData = leaves.map((item) => ({
    type: item.leaveType,
    from: formatDate(item.fromDate),
    to: formatDate(item.toDate),
    reason: item.reason,
    status: item.status,
  }));

  const csvHeaders = [
    { label: "Type", key: "type" },
    { label: "From", key: "from" },
    { label: "To", key: "to" },
    { label: "Reason", key: "reason" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📄 Leave History</h1>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename="leave-history.csv"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            Export CSV
          </CSVLink>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.leaveType}</td>
                  <td className="px-4 py-2">{formatDate(item.fromDate)}</td>
                  <td className="px-4 py-2">{formatDate(item.toDate)}</td>
                  <td className="px-4 py-2">{item.reason}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No leave records found.
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

export default LeaveHistoryPage;
