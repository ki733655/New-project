"use client"
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/lib/tabledata';

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await fetchData();
        console.log(fetchData)
        setTableData(data); // Update state with fetched data
      } catch (error) {
        console.log("Error while fetching table data:", error);
      }
    };

    fetchTableData();
  }, []);
return (
    <div>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* Add more headers as per your data structure */}
          </tr>
        </thead>
        <tbody>
          {tableData.map(data => (
            <tr key={data.email}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              {/* Render more data columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;