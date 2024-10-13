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
  const dispatch = useDispatch();
  const [dataType, setDataType] = useState(""); // To keep track of current data type (users, bookings, providers)
  const navigate = useNavigate();
  // Fetch and display all users
  const handleAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/allusers");
      setData(res.data.allusers);
      setDataType("users");
      console.log(res.data.allusers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch and display all bookings
  const handleAllBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/allbooking");
      setData(res.data.bookings);
      setDataType("bookings");
      console.log(res.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch and display all service providers
  const handleAllServiceProviders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/allprovider"
      );
      setData(res.data.allproviders);
      setDataType("providers");
      console.log(res.data.allproviders);
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  };
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
              {item.experience || "N/A"} years
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <ul>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <button onClick={handleAllBookings}>Bookings</button>
          </li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <button onClick={handleAllUsers}>Users</button>
          </li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <button onClick={handleAllServiceProviders}>
              Service Providers
            </button>
          </li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Dashboard Data</h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                renderTableRows()
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
