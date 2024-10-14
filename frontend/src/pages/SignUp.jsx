import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const SignUp = () => {
  const navigate = useNavigate();

  const [fomData, setFormData] = useState({
    name: "",
    email: " ",
    password: "",
    phone: "",
  });

  const handleCreateAccount = () => {
    navigate("/login");
  };

  const handlechange = (e) => {
    const { id, value } = e.target;

    setFormData((pre) => ({
      ...pre,
      [id]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/signup/", fomData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              value={fomData.username}
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
              value={fomData.email}
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
              value={fomData.phone}
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
              value={fomData.password}
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
            />
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
              onClick={handleCreateAccount}
              className="text-blue-500 hover:underline"
            >
              Login an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
