"use client"
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import axios from 'axios';
import { Button } from "@/components/button"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import EditAttendance from './EditAttendance';
import { fetchData } from '@/app/api/lib/tabledata';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [ishandleEdit, setHandleEdit] = useState(null);

  // useEffect(() => {
  //   // Fetch user name from localStorage on client-side
  //   const storedName = localStorage.getItem('user');
  //   if (storedName) {
  //     setName(storedName);
  //   }

  //   // Fetch table data from server on client-side
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/show-table-user");
  //       if (response && response.data) {
  //         setTableData(response.data);
  //         console.log("Data fetched successfully:", response.data);
  //       }
  //     } catch (error) {
  //       console.log("Error while fetching data:", error);
  //     }
  //   };

  //   fetchData(); // Call fetchData on component mount (client-side)
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  

  useEffect(() => {
    const fetchTableData = async () => {

      try {
        const data = await fetchData(data.name);

        setTableData(data); // Update state with fetched data
      } catch (error) {
        console.log("Error while fetching table data:", error);
      }
    };

    fetchTableData(); // Fetch data when component mounts
  }, []);
  
  const handleDelete = async (email) => {
    try {
      console.log("Deleting user with email:", email);
      const response = await axios.delete(`http://localhost:4000/delete-table-user/${email}`);
      const result = response.data;
      console.log("Delete response:", result);

      if (result) {
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

  const handleEdit = (data) => {
    setHandleEdit(data);
  };

  return (
    <div className="main p-4 h-full"> 
      <h1 className="text-3xl font-bold">Welcome {name}</h1>

      <div className="tablediv mt-[45vh]">
        <Link href="/attendance-form">
          <Button className='border-black ml-[87vw] mb-4' variant="outline">Add user</Button>
        </Link>

        <Table className='border-b-slate-300'>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Current Date</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((data, idx) => (
              <TableRow key={idx}>
                <TableCell>{data?.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.employeeType}</TableCell>
                <TableCell>{data.currentDate}</TableCell>
                <TableCell>{data.inTime}</TableCell>
                <TableCell>{data.outTime}</TableCell>
                <TableCell>
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
      
      {ishandleEdit && <EditAttendance ishandleEdit={ishandleEdit} setHandleEdit={setHandleEdit} />}
    </div>
  );
};

export default Dashboard;
