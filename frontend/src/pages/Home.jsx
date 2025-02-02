import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import cook from "../Assest/cook.jpeg";
import electri from "../Assest/electronics1.jpeg";
import mali from "../Assest/mali.jpeg";
import user from "../Assest/11455479.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.subscription);

  return (
    <>
      <Header />
      <main className="p-4">
        {/* Login Section */}
        <section className="text-center my-8">
          <div className="flex flex-col md:flex-row justify-center items-center mx-9 h-full">
            <h1 className="font-bold mb-5 md:mb-0 md:mr-7 text-2xl md:text-3xl font-serif">
              Login to access <br />
              your account
            </h1>
            <img
              src={user}
              alt="Book-a-electrician"
              className="w-40 md:w-60 h-full object-cover"
            />
          </div>

          {/* Login Options */}
          <div className="flex flex-col md:flex-row justify-around mt-5 h-full">
            <Link to="/login" className="mb-4 md:mb-0">
              <div className="flex flex-row underline items-center">
                <div className="font-bold text-2xl md:text-3xl p-5">User</div>
                <FaArrowRight className="ml-2" />
              </div>
            </Link>
            <Link to="/login-provider">
              <div className="flex flex-row underline items-center p-5">
                <div className="font-bold text-2xl md:text-3xl">
                  ServiceProvider
                </div>
                <FaArrowRight className="ml-2" />
              </div>
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-5">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={cook}
                  alt="Book-a-cook"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Book-a-cook</h3>
                <p className="text-gray-700 mb-4">
                  Are you in need of a cook to prepare delicious meals? Book our
                  expert cooking services and enjoy a hassle-free meal
                  experience.
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() =>
                    status === "active"
                      ? navigate("/cook-list")
                      : navigate("/plan")
                  }
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={electri}
                  alt="Book-a-electrician"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Book-a-electrician
                </h3>
                <p className="text-gray-700 mb-4">
                  Need electrical repairs or installations? Our certified
                  electricians are here to help with all your electrical needs.
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() =>
                    status === "active"
                      ? navigate("/electrician-list")
                      : navigate("/plan")
                  }
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={mali}
                  alt="Book-a-Gardener"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Book-a-Gardener</h3>
                <p className="text-gray-700 mb-4">
                  Looking to enhance your garden? Our professional gardeners
                  offer top-notch services to make your garden thrive.
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() =>
                    status === "active"
                      ? navigate("/gardner-list")
                      : navigate("/plan")
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="text-center my-8">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Book-a-cook</h3>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-gray-600">(4.5/5)</span>
              </div>
              <p className="text-gray-600">
                <em>
                  "The food was amazing! Highly recommend for any occasion."
                </em>
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Book-a-electrician</h3>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-gray-600">(4.8/5)</span>
              </div>
              <p className="text-gray-600">
                <em>
                  "Professional and efficient service. The job was done
                  perfectly."
                </em>
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Book-a-Gardener</h3>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-gray-600">(4.7/5)</span>
              </div>
              <p className="text-gray-600">
                <em>"Great service! The garden looks fantastic now."</em>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
