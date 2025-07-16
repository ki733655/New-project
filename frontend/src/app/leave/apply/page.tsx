"use client";
import axios from "axios";
import React, { useState } from "react";

const LeaveApplyPage = () => {
  const [leave, setLeave] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/leave/apply",
        leave,
        { withCredentials: true },
      );
      setSubmitted(true);

      alert("Data sent successfully");


      setLeave({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });


    } catch (err) {
      console.log(err);
      alert("Error submitting leave data" + err.message);
    }
    console.log("Leave Submitted:", leave);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">📋 Apply for Leave</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Leave Type</label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Paid">Paid Leave</option>
              <option value="Emergency">Emergency Leave</option>
              <option value="Other">Other</option>

            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={leave.fromDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                name="toDate"
                value={leave.toDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            ✅ Leave application submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplyPage;
