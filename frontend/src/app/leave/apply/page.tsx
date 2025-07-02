"use client";
import React, { useState } from "react";

const LeaveApplyPage = () => {
  const [leave, setLeave] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate backend submission
    console.log("Leave Submitted:", leave);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setLeave({ type: "", from: "", to: "", reason: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">📋 Apply for Leave</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Leave Type</label>
            <select
              name="type"
              value={leave.type}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                name="from"
                value={leave.from}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                name="to"
                value={leave.to}
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
