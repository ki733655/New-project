"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser, FaTrash, FaEdit } from "react-icons/fa";

// Define the shape of your user data
interface User {
  _id: string;
  empId: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(`${API_BASE_URL}get/user/details`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error while fetching users:", err);
        alert("Error while fetching users");
      }
    };

    fetchData();
  }, [API_BASE_URL]); // Added dependency array

  // Delete user
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}delete/user/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit user
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditFormData({ name: user.name, email: user.email, role: user.role });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    if (!editingUser) return;

    try {
      await axios.put(`${API_BASE_URL}update/user/${editingUser._id}`, editFormData);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === editingUser._id ? { ...user, ...editFormData } : user
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Filtering
  const filteredUsers = users.filter((user) => {
    const matchesQuery =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      user.role.trim().toLowerCase() === roleFilter.toLowerCase();

    return matchesQuery && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">👥 All Employees</h1>

        <div className="overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by Name or Emp ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded w-1/2"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border rounded ml-4"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Emp Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.empId}</td>
                  <td className="px-4 py-2 font-semibold flex items-center gap-2">
                    <FaUser className="text-blue-500" /> {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
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

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              name="role"
              value={editFormData.role}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
