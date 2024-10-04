import React, { useEffect, useState } from "react";
import { Star, Clock } from "lucide-react";
import axios from "axios";

export default function ServiceList() {
  const [user, setUser] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);

  const handleBooking = (userId) => {
    setBookedUsers((prev) => [...prev, userId]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/service-provider/gardners"
        );
        setUser(response.data.gardnerData);
        console.log(response.data.gardnerData); // Log the data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Service Providers
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.profession}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span>{user.experience} years experience</span>
              </div>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>{user.rating.toFixed(1)} rating</span>
              </div>
              <button
                onClick={() => handleBooking(user.id)}
                disabled={bookedUsers.includes(user.id)}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
                  bookedUsers.includes(user.id)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {bookedUsers.includes(user.id) ? "Booked" : "Book Service"}
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
