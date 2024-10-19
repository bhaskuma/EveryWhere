import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProvider } from "../../redux/serviceProvider/serviceProviderSlice";
import axios from "axios";

export default function ServiceList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);

  const handleBooking = (providerId) => {
    const selectedProvider = users.find((user) => user.phone === providerId);
    if (selectedProvider) {
      setBookedUsers((prev) => [...prev, providerId]);
      dispatch(setProvider(selectedProvider)); // Save only the selected provider's info
      navigate("/booking");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://everywhere-ipb6.onrender.com/api/service-provider/gardners"
        );

        setUsers(response.data.gardnerData || []);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.phone}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} // Placeholder avatar
                    alt={user.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">
                      {user.profession || "Service Provider"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <span>{user.experience || 0} years experience</span>
                </div>
                <button
                  onClick={() => handleBooking(user.phone)}
                  disabled={bookedUsers.includes(user.phone)}
                  className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
                    bookedUsers.includes(user.phone)
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {bookedUsers.includes(user.phone) ? "Booked" : "Book Service"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No service providers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
