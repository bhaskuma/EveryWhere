import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import {
  setSubscription,
  clearSubscription,
} from "../redux/subscription/subscriptionSlice";

import axios from "axios";
export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleProvider = () => {
    navigate("/signup-provider");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "https://everywhere-ipb6.onrender.com/signin/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status != 200) {
        return dispatch(signInFailure(res.message));
      }

      dispatch(setSubscription(res.data.subscription));
      dispatch(signInSuccess(res.data.user));
      if (res.data.user.role == 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Error during signin:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [id]: value,
    }));
  };
  return (
    <div className="bg-slate-50 flex justify-center items-center min-h-screen">
      <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl mb-6 text-center font-bold">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              placeholder="Email"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
              value={formData.email}
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
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={handleCreateAccount}
                className="text-blue-500 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>

          <div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Register as Service Provider?{" "}
                <button
                  onClick={handleProvider}
                  className="text-blue-500 hover:underline"
                >
                  Create an ServiceProvider account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
