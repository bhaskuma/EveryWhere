import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    {
      username: "",
      email: "",
      password: "",
      phone: "",
      experience: "",
      servicesOffered: "",
    },
  ]);
  const handleForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://everywhere-ipb6.onrender.com/api/service-provider/signup",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res) {
      navigate("/login-provider");
    }
  };
  const handlecreate = () => {
    navigate("/login-provider");
  };
  const handlechange = (e) => {
    const { id, value } = e.target;

    setFormData((pre) => ({
      ...pre,
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleForm}>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              value={formData.username}
              placeholder="Username"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              placeholder="Phone number"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={formData.password}
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="experience"
              className="text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <input
              value={formData.experience}
              id="experience"
              type="number"
              placeholder="experience in years"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              ServicesOffered
            </label>
            <select
              name="servicesOffered"
              id="servicesOffered"
              value={formData.servicesOffered}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            >
              <option value="mali">mali</option>
              <option value="electrician">electrician</option>
              <option value="cooking">cooking</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={handlecreate}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
