import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, MapPin } from "lucide-react";
import { useSelector } from "react-redux";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = currentUser._id;

        const response = await axios.post(
          "https://everywhere-ipb6.onrender.com/api/mybooking",
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response.data, "this is response");
        setBookings(response.data.bookings); // Correct response structure
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [currentUser._id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Upcoming Bookings
      </h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(({ booking, serviceProviderName, serviceType }) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {serviceProviderName}
                  </h2>
                  <p className="text-sm text-gray-600">{serviceType}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(booking.bookingDate).toLocaleDateString()} at{" "}
                    {booking.bookingTime}
                  </span>
                </div>
                <div className="flex items-center text-gray-700 mt-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{booking.address}</span>
                </div>
                <div className="flex items-center text-gray-700 mt-2">
                  <span className=" bg-blue-100">Status: {booking.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
