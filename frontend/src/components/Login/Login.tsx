"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner4 } from "react-icons/im";

interface LoginForm {
  email: string;
  password: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";


const Login: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}login`, data, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(localStorage.getItem("user"));

      if (res.data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-black text-2xl animate-spin">
          <ImSpinner4 />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-500 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Let&apos;s You Login
        </h2>
        <p className="text-center text-lg text-white mb-8">
          Welcome to TrackMate
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Enter Your Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Enter Your Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-2 px-4 font-semibold ${
              loading
                ? "bg-green-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-800 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
