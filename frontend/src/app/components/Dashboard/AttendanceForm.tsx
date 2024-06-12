"use client"
import axios from 'axios';
import { useState } from 'react';

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    select: "",
    empId: '',
    inTime: '',
    outTime: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format time inputs to include AM/PM
    // const formattedFormData = {
    //   ...formData,
    //   inTime: formatTime(formData.inTime),
    //   outTime: formatTime(formData.outTime),
    //   currentDate: formatDate(formData.currentDate), // Format date here
    // };

    try {
      const response = await axios.post("http://localhost:4000/add-table-user", formData);
      console.log(response.data);
      alert("Data submitted successfully");

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        select: "",
        empId: '',
        inTime: '',
        outTime: '',
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error gracefully, show error message to user
    }
  };

  // Helper function to format time with AM/PM
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const formattedHour = parseInt(hour) % 12 || 12; // Convert hour to 12-hour format
    const period = parseInt(hour) < 12 ? "AM" : "PM";
    return `${formattedHour}:${minute} ${period}`;
  };

  // Helper function to format date to dd/mm/yyyy
  const formatDate = (date) => {
    const [year, month, day] = date.split("-"); // Split yyyy-mm-dd
    return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
  };


  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Employeee type
          </label>
          <select id='select'
          name='select' value={formData.select} onChange={handleChange}>
            <option selected>Select the emplyoee type</option>
            <option value="developer">Developer</option>
            <option value="tester">Tester</option>
            <option value="management">Management</option>


          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Emp Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="empId"
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inTime">
            In Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inTime"
            type="time"
            name="inTime"
            value={formData.inTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="outTime">
            Out Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="outTime"
            type="time"
            name="outTime"
            value={formData.outTime}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
