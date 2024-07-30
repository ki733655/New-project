"use client"
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import axios from 'axios';
import { Button } from "@/components/button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import EditAttendance from './EditAttendance';
import { fetchData } from '@/app/api/lib/tabledata';
import { Box } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

const Dashboard = () => {
  // State variables
  const [name, setName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [ishandleEdit, setHandleEdit] = useState(null);
  const [showDiv, setShowDiv] = useState(false); // New state for showing the div
  const [inTime, setInTime] = useState(''); // State for inTime
  const [outTime, setOutTime] = useState(''); // State for outTime
  const [divPosition, setDivPosition] = useState({ top: 0, left: 0 }); // State for div position

  // Fetch user name and table data on component mount
  useEffect(() => {
    // Fetch user name from localStorage on client-side
    const storedName = localStorage.getItem('admin');
    if (storedName) {
      setName(storedName);
    }

    // Fetch table data from server on client-side
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/show-table-user");
        if (response && response.data) {
          setTableData(response.data);
          console.log("Data fetched successfully:", response.data);
        }
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    fetchData(); // Call fetchData on component mount (client-side)
  }, [ishandleEdit]); // Empty dependency array ensures this effect runs only once on mount

  // Delete user data
  const handleDelete = async (email) => {
    try {
      console.log("Deleting user with email:", email);
      const response = await axios.delete(`http://localhost:4000/delete-table-user/${email}`);
      const result = response.data;
      console.log("Delete response:", result);

      if (result) {
        // Update table data after successful deletion
        setTableData((prevTableData) => {
          const updatedTableData = prevTableData.filter((data) => data.email !== email);
          console.log("Table data updated successfully:", updatedTableData);
          return updatedTableData;
        });
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  // Set data for editing
  const handleEdit = (data) => {
    setHandleEdit(data);
  };

  // Toggle div visibility and set inTime and outTime
  const handleShowDiv = (event, inTime, outTime) => {
    const buttonPosition = event.currentTarget.getBoundingClientRect();
    setDivPosition({ top: buttonPosition.top + window.scrollY, left: buttonPosition.left + window.scrollX });
    setInTime(inTime);
    setOutTime(outTime);
    setShowDiv(!showDiv);
  };

  return (
    <div className="main p-4 h-full">
      <h1 className="text-3xl font-bold">Welcome {name}</h1>

      <div className="tablediv mt-[45vh]">
        {/* Link to the attendance form */}
        <Link href="/attendance-form">
          <Button className='border-black ml-[87vw] mb-4' variant="outline">Add user</Button>
        </Link>

        {/* Table to display attendance data */}
        <Table className='border-b-slate-300'>
          <TableHeader className='bg-sky-200'>
            <TableRow>
              <TableCell>Sl no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Emp Id</TableCell>
              <TableCell>Show inTime & ouTime</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping over table data to display rows */}
            {tableData.filter(data => data.select !== 'admin') // Filter out 'admin' users
              .map((data, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{data?.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.select}</TableCell>
                  <TableCell>{data.empId}</TableCell>
                  <TableCell>
                    <Button onClick={(event) => handleShowDiv(event, data.inTime, data.outTime)}>Show</Button>
                  </TableCell>
                  <TableCell>
                    {/* Buttons for editing and deleting data */}
                    <div className='flex gap-4'>
                      <MdDelete onClick={() => handleDelete(data.email)} />
                      <FaEdit onClick={() => handleEdit(data)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Render div if showDiv is true */}
      {showDiv && (
        <div className="h-[70vh] w-[35vw] border-black absolute" style={{ 
          top: `${divPosition.top}px`,left: "30vw", display: "flex", justifyContent: "space-evenly", padding: "2vh", backgroundColor: "#fafcfb", boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)" }}>
          <div className='mt-4'>
            <h2 style={{ fontSize: "1.8rem", color: "skyblue", fontFamily: "cursive", marginBottom: "2vh" }}>Intime :</h2>
            {inTime.slice().reverse().map((time, index) => ( // Using slice() to create a copy and then reverse()
              <h4 key={index}>{time}</h4>
            ))}
          </div>
          <div className="mt-4">
            <h2 style={{ fontSize: "1.8rem", color: "skyblue", fontFamily: "cursive", marginBottom: "2vh" }}>Outime :</h2>
            {outTime.slice().reverse().map((time, index) => ( // Using slice() to create a copy and then reverse()
              <h4 key={index}>{time}</h4>
            ))}
          </div>

          <MdOutlineCancel className='h-7 w-10 mr-0 absolute right-2 text-red-500' onClick={() => setShowDiv(false)} />
        </div>
      )}

      {/* Render edit attendance component if editing is enabled */}
      {ishandleEdit && <EditAttendance ishandleEdit={ishandleEdit} setHandleEdit={setHandleEdit} />}
    </div>
  );
};

export default Dashboard;
