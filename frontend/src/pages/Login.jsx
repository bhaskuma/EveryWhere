import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { setSubscription } from "../redux/subscription/subscriptionSlice";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleProvider = () => {
    navigate("/signup-provider");
  };

  // Validation function
  const validateForm = () => {
    const { email, password } = formData;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrorMessage("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return false;
    } else if (password.length < 5) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }

    setErrorMessage(""); // Clear error message if valid
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation before making the API call
    if (!validateForm()) return;

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

      if (res.status !== 200) {
        setErrorMessage("Invalid credentials, please try again."); // Set error message
        return dispatch(signInFailure(res.message));
      }

      dispatch(setSubscription(res.data.subscription));
      dispatch(signInSuccess(res.data.user));

      if (res.data.user.role === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password, please try again."); // Set error message on failure
      dispatch(signInFailure(error.message));
      console.error("Error during signin:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="bg-slate-50 flex justify-center items-center min-h-screen">
      <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl mb-6 text-center font-bold">Login</h1>

        {/* Display error message if exists */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

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

          <p className="mt-4 text-sm text-gray-600">
            Register as Service Provider?{" "}
            <button
              onClick={handleProvider}
              className="text-blue-500 hover:underline"
            >
              Create a ServiceProvider account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
