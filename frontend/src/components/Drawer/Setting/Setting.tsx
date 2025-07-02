"use client"
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const Setting = () => {
  const router = useRouter();
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   // This will run only on the client side
  //   setIsClient(typeof window !== 'undefined');
  // }, []); 

  const handleLogout = () => {

    localStorage.removeItem("token");
    alert("You have been logged out.");
    router.push("/login");


    // Clear all local storage and session storage
    // localStorage.clear();
    // sessionStorage.clear();
    
    // // Redirect to login page
    // if (isClient) {
    //   window.location.href = '/login';
    // }
  };

  return (
    <div className="pl-10">
      <button
        onClick={handleLogout}
        className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Setting;
