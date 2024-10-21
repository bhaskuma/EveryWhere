import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutSuccess,
  signOutFailure,
  signOutStart,
} from "../redux/user/userSlice";

export const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [dataType, setDataType] = useState(""); // To keep track of current data type (users, bookings, providers)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch and display all users
  const handleAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://everywhere-ipb6.onrender.com/api/allusers"
      );
      setData(res.data.allusers);
      setDataType("users");
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch and display all bookings
  const handleAllBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://everywhere-ipb6.onrender.com/api/allbookings"
      );

      setData(res.data.bookings);
      setDataType("bookings");
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch and display all service providers
  const handleAllServiceProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://everywhere-ipb6.onrender.com/api/allProvider"
      );

      setData(res.data.allProviders);
      setDataType("providers");
    } catch (error) {
      console.error("Error fetching service providers:", error);
      setError("Failed to fetch service providers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch and display all subscriptions
  const handleAllSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://everywhere-ipb6.onrender.com/api/allsubscriptions"
      );
      setData(res.data.subscriptionsWithUsers); // Fixed state assignment
      setDataType("subscriptions");
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setError("Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    try {
      dispatch(signOutStart());
      dispatch(signOutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  // Define columns dynamically based on data type
  const renderTableHeader = () => {
    if (dataType === "users") {
      return (
        <>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Phone
          </th>
        </>
      );
    } else if (dataType === "bookings") {
      return (
        <>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Booking Date
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Booking Time
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Address
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
        </>
      );
    } else if (dataType === "providers") {
      return (
        <>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Services Offered
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Experience
          </th>
        </>
      );
    } else if (dataType === "subscriptions") {
      return (
        <>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            StartDate
          </th>
          <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            EndDate
          </th>
        </>
      );
    }
  };

  // Dynamically render table rows based on data type
  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {dataType === "users" && (
          <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.name || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.email || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.phone || "N/A"}
            </td>
          </>
        )}
        {dataType === "bookings" && (
          <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {new Date(item.bookingDate).toLocaleDateString() || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.bookingTime || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.address || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.status || "N/A"}
            </td>
          </>
        )}
        {dataType === "providers" && (
          <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.name || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.email || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.servicesOffered || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.experience || "N/A"}
            </td>
          </>
        )}
        {dataType === "subscriptions" && (
          <>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.user.name || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.status || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.startDate || "N/A"}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.endDate || "N/A"}
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-wrap space-x-4 mt-6">
            <button
              onClick={handleAllUsers}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              All Users
            </button>
            <button
              onClick={handleAllBookings}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              All Bookings
            </button>
            <button
              onClick={handleAllServiceProviders}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              All Service Providers
            </button>
            <button
              onClick={handleAllSubscriptions}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              All Subscriptions
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {!loading && data.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
