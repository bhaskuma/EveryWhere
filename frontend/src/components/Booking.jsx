import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Booking = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentProvider } = useSelector((state) => state.serviceprovider);
  const navigate = useNavigate();
  const [data, setData] = useState({
    userId: currentUser._id,
    serviceproviderId: currentProvider._id,
    Date: "",
    Time: "",
    Address: "",
  });

  const handlechange = (e) => {
    const { id, value } = e.target;

    setData((pre) => ({
      ...pre,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://everywhere-ipb6.onrender.com/api/createbooking",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (res.status == 201) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="mt-10 mb-8">
        <h1 className="font-bold text-4xl text-gray-800">Booking Form</h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date:
            </label>
            <input
              id="Date"
              type="date"
              value={data.Date}
              onChange={handlechange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Time:
            </label>
            <input
              id="Time"
              type="time"
              value={data.Time}
              onChange={handlechange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address:
            </label>
            <input
              id="Address"
              type="text"
              value={data.Address}
              onChange={handlechange}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
