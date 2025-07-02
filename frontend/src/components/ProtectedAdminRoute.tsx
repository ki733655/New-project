"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { ImSpinner4 } from "react-icons/im";

const ProtectedAdminRoute = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt_decode(token);

      if (decoded.role === "admin") {
        setAuthorized(true);
      } else {
        router.push("/dashboard-user");
      }
    } catch (err) {
      Cookies.remove("token");
      router.push("/login");
    } finally {
      setLoading(false); // <-- Mark loading done
    }
  }, [router]);

  // Show spinner while checking token
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-600 text-white text-2xl">
        <ImSpinner4 className="animate-spin mr-2" />
        Checking access...
      </div>
    );
  }

  if (!authorized) return null; // <-- Don't flash unauthorized view

  return <>{children}</>;
};

export default ProtectedAdminRoute;
