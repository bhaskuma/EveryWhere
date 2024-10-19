import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/provider/providerSlice";

const LoginProvider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }

    setErrorMessage(""); // Clear error message if valid
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before making the API request
    if (!validateForm()) return;

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "https://everywhere-ipb6.onrender.com/api/service-provider/signin",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 201) {
        setErrorMessage("Invalid credentials, please try again.");
        dispatch(signInFailure(res.message));
        return;
      }

      dispatch(signInSuccess(res.data.data));
      navigate("/provider-dashboard");
    } catch (error) {
      setErrorMessage("Error during sign-in. Please try again.");
      dispatch(signInFailure(error.message));
      console.error("Error during signin:", error);
    }
  };

  const handleCreateAccount = () => {
    navigate("/signup-provider");
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
        </div>
      </div>
    </div>
  );
};

export default LoginProvider;
