"use client";
import React, { useState } from "react";
import { FaUser, FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";

const dummyUsers = [
  { id: 1, name: "Aiyan Khan", email: "aiyan@gmail.com", role: "User", status: "Active" },
  { id: 2, name: "Zara Ali", email: "zara@gmail.com", role: "User", status: "Inactive" },
  { id: 3, name: "Admin John", email: "admin@gmail.com", role: "Admin", status: "Active" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">👥 All Employees</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2 font-semibold flex items-center gap-2">
                    <FaUser className="text-blue-500" /> {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <FaTrash />
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

export default UserManagement;
