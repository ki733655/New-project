"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

const dummyLeaves = [
  {
    id: 1,
    name: "Aiyan Khan",
    email: "aiyan@gmail.com",
    from: "2025-07-01",
    to: "2025-07-03",
    reason: "Fever & rest",
    status: "Pending",
  },
  {
    id: 2,
    name: "Zara Ali",
    email: "zara@gmail.com",
    from: "2025-07-05",
    to: "2025-07-07",
    reason: "Family Event",
    status: "Approved",
  },
  {
    id: 3,
    name: "Imran Hussain",
    email: "imran@gmail.com",
    from: "2025-07-02",
    to: "2025-07-04",
    reason: "Emergency Leave",
    status: "Rejected",
  },
];

const LeaveApprovalPage = () => {
  const [leaves, setLeaves] = useState(dummyLeaves);

  const handleAction = (id: number, newStatus: string) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">🧾 Leave Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Duration</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-t">
                  <td className="px-4 py-2">
                    <p className="font-semibold">{leave.name}</p>
                    <p className="text-sm text-gray-500">{leave.email}</p>
                  </td>
                  <td className="px-4 py-2">
                    {leave.from} → {leave.to}
                  </td>
                  <td className="px-4 py-2">{leave.reason}</td>
                  <td className="px-4 py-2">
                    {leave.status === "Pending" && (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <FaClock /> Pending
                      </span>
                    )}
                    {leave.status === "Approved" && (
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheck /> Approved
                      </span>
                    )}
                    {leave.status === "Rejected" && (
                      <span className="text-red-600 flex items-center gap-1">
                        <FaTimes /> Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAction(leave.id, "Approved")}
                      disabled={leave.status !== "Pending"}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(leave.id, "Rejected")}
                      disabled={leave.status !== "Pending"}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApprovalPage;
