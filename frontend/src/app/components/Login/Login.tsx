"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [authentication, setAuthentication] = useState(false);
  const [userAuthentication, setUserAuthentication] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login-form",
        data
      );
      console.log(response.data);
      if (response.data.email === "Admin@gmail.com") {
        setAuthentication(true);
        localStorage.setItem("admin", response.data.name);
        localStorage.setItem("email", response.data.email);
      } else {
        setUserAuthentication(true);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("email", response.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authentication) {
      router.push("/dashboard");
    }
    if (userAuthentication) {
      router.push("/dashboard-user");
    }
  }, [authentication, userAuthentication]);

  return (
    <>
      <div className="bg-blue-600 flex md:grid-cols-2 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Let' You Login
          </h2>
          <h2 className="text-center text-2xl leading-6 tracking-tight text-gray-900 text-white">
            Welcome to TrackMate
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 text-white">
                Enter Your Email
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900 text-white">
                  Enter Your Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button 
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>
          <h1 className="block text-sm font-medium leading-6 text-gray-900 text-white">
            Forget Password
          </h1>
        </div>
        <div className="image">
          <img src="./LoginBanner.svg" style={{ maxWidth: 500 }} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
