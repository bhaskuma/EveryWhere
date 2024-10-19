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
  const [formData, setFormData] = useState([
    {
      email: " ",
      password: "",
    },
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "https://everywhere-ipb6.onrender.com/api/service-provider/signin",
        formData
      );
      if (res.status != 201) {
        return dispatch(signInFailure(res.message));
      }

      dispatch(signInSuccess(res.data.data));
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error("Error during signin:", error);
    }
    const res = await axios.post(
      "https://everywhere-ipb6.onrender.com/api/service-provider/signin",
      formData
    );
    if (res) {
      navigate("/provider-dashboard");
    }
  };
  const handleCreateAccount = () => {
    navigate("/signup-provider");
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
        </div>
      </div>
    </div>
  );
};

export default LoginProvider;
