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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching functions (omitted for brevity)

  // Handle logout (omitted for brevity)

  const renderTableHeader = () => {
    if (dataType === "users") {
      return (
        <>
          <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Phone
          </th>
        </>
      );
    }
    // Other data types' headers (omitted for brevity)
  };

  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {dataType === "users" && (
          <>
            <td className="px-2 py-5 border-b border-gray-200 text-sm">
              {item.name || "N/A"}
            </td>
            <td className="px-2 py-5 border-b border-gray-200 text-sm">
              {item.email || "N/A"}
            </td>
            <td className="px-2 py-5 border-b border-gray-200 text-sm">
              {item.phone || "N/A"}
            </td>
          </>
        )}
        {/* Other data types' rows (omitted for brevity) */}
      </tr>
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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

          <div className="flex flex-wrap mt-6 space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAllUsers}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              All Users
            </button>
            <button
              onClick={handleAllBookings}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              All Bookings
            </button>
            <button
              onClick={handleAllServiceProviders}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              All Service Providers
            </button>
            <button
              onClick={handleAllSubscriptions}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              All Subscriptions
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center mt-6">
              <div className="spinner"></div>
            </div>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {!loading && data.length > 0 && (
            <div className="mt-6 overflow-x-auto">
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
