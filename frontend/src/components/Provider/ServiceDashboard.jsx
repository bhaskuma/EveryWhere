import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../../redux/provider/providerSlice";

const ServiceDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const { currentProvider } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const serviceId = currentProvider._id;
        const response = await axios.post(
          "https://everywhere-ipb6.onrender.com/api/service-provider/providerlist",
          { serviceId }
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };

    fetchBookings();
  }, []);

  const acceptBooking = async (bookingId) => {
    try {
      await axios.put(
        `https://everywhere-ipb6.onrender.com/api/acceptbooking/${bookingId}`
      );

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Accepted" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error accepting booking", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(
        `https://everywhere-ipb6.onrender.com/api/deletebooking/${bookingId}`
      );
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(signOutStart());
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Service Provider Dashboard
          </h1>
        </div>
        <ul>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <a href="/dashboard">Bookings</a>
          </li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Upcoming Bookings
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-3 md:px-5 md:py-3 bg-gray-100 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-2 py-3 md:px-5 md:py-3 bg-gray-100 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Booking Time
                </th>
                <th className="px-2 py-3 md:px-5 md:py-3 bg-gray-100 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-2 py-3 md:px-5 md:py-3 bg-gray-100 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 py-3 md:px-5 md:py-3 bg-gray-100 text-center text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-2 py-2 md:px-5 md:py-5 border-b border-gray-200 bg-white text-xs md:text-sm">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-2 md:px-5 md:py-5 border-b border-gray-200 bg-white text-xs md:text-sm">
                    {booking.bookingTime}
                  </td>
                  <td className="px-2 py-2 md:px-5 md:py-5 border-b border-gray-200 bg-white text-xs md:text-sm">
                    {booking.Address}
                  </td>
                  <td className="px-2 py-2 md:px-5 md:py-5 border-b border-gray-200 bg-white text-xs md:text-sm">
                    {booking.status}
                  </td>
                  <td className="px-2 py-2 md:px-5 md:py-5 border-b border-gray-200 bg-white text-xs md:text-sm text-center">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => acceptBooking(booking._id)}
                          className="mr-2 bg-green-500 text-white px-3 py-1 rounded text-xs md:text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {booking.status === "accept" && (
                      <span className="text-green-600 font-semibold">
                        Accepted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="p-5 text-center text-gray-600">
              No upcoming bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDashboard;
