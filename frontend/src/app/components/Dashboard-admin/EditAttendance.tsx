import axios from 'axios';
import React, { useState } from 'react'

const EditAttendance = ({ishandleEdit, setHandleEdit}) => {
  console.log(ishandleEdit);

    const [formData, setFormData] = useState({
        name: ishandleEdit.name  || '',
        email: ishandleEdit.email  || '',
        select: ishandleEdit.select  || '',
        empId: ishandleEdit.empId  || '',
        inTime: ishandleEdit.inTime  || '',
        outTime: ishandleEdit.outTime  || '',
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
  
    
        try {
          const response = await axios.put("http://localhost:4000/edit-table-user", formData);
          console.log(response.data);
          alert("Data submitted successfully");

  
          
          // to close the form
          setHandleEdit(null)
        } catch (error) {
          console.error("Error submitting form:", error);
          // Handle error gracefully, show error message to user
        }
      };
    
    
      return (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 absolute top-0 left-[33vw] w-[35vw]">
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
                readOnly
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
                readOnly

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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>

);
};

export default EditAttendance;