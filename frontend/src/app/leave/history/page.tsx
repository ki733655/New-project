"use client";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const dummyLeaveData = [
  {
    type: "Sick Leave",
    from: "2025-06-20",
    to: "2025-06-22",
    reason: "Fever and weakness",
    status: "Approved",
  },
  {
    type: "Casual Leave",
    from: "2025-07-01",
    to: "2025-07-01",
    reason: "Family event",
    status: "Pending",
  },
  {
    type: "Earned Leave",
    from: "2025-05-05",
    to: "2025-05-07",
    reason: "Vacation",
    status: "Rejected",
  },
];

const LeaveHistoryPage = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Simulate API call
    setLeaves(dummyLeaveData);
  }, []);

  const csvHeaders = [
    { label: "Type", key: "type" },
    { label: "From", key: "from" },
    { label: "To", key: "to" },
    { label: "Reason", key: "reason" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📄 Leave History</h1>
          <CSVLink
            data={leaves}
            headers={csvHeaders}
            filename="leave-history.csv"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.from}</td>
                  <td className="px-4 py-2">{item.to}</td>
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
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
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
