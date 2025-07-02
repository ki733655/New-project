"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImSpinner4 } from "react-icons/im";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // const [checkingAuth, setCheckingAuth] = useState(true); // NEW

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/login", data);
      Cookies.set("token", response.data.token, { expires: 7 });

      // ✅ Securely fetch role
      const res = await axios.get("http://localhost:4000/me", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      const { role } = res.data;
      if (role === "admin") router.push("/dashboard-admin");
      else router.push("/dashboard-user");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check auth on mount securely
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     // setCheckingAuth(false);
  //     return;
  //   }

  //   axios.get("http://localhost:4000/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => {
  //     const { role } = res.data;
  //     if (role === "admin") router.push("/dashboard-admin");
  //     else router.push("/dashboard-user");
  //   })
  //   .catch(() => {
  //     Cookies.remove("token");
  //     // setCheckingAuth(false);
  //   });
  // }, []);

  // 🔄 Show spinner while checking auth
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
    <div className="flex items-center justify-center min-h-screen bg-blue-600 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Let's You Login
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
            className={`w-full rounded-md py-2 px-4 font-semibold ${loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <Link href="/forgot-pass">
          <p className="text-center text-sm text-white mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
