import React, { useState } from "react";
import logo from "../Assest/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutSuccess,
  signOutFailure,
  signOutStart,
} from "../redux/user/userSlice";
import { clearSubscription } from "../redux/subscription/subscriptionSlice";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu

  const handleLogout = () => {
    try {
      dispatch(clearSubscription());
      dispatch(signOutStart());
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  return (
    <div className="bg-black h-16 w-screen text-white flex justify-between items-center p-4">
      {/* Logo and brand */}
      <div className="flex items-center gap-5">
        <img src={logo} alt="Logo" className="h-10 rounded-sm" />
        <span className="text-white text-3xl font-bold hover:text-gray-300 transition-colors">
          EveryWhere
        </span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Links for Desktop */}
      <div className="hidden md:flex gap-5 items-center">
        <button onClick={(e) => navigate("/")}>Home</button>
        {currentUser ? (
          <>
            <button onClick={(e) => navigate("/my-booking")}>Booking</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={(e) => navigate("/login")}>Login</button>
            <button onClick={(e) => navigate("/signup")}>SignUp</button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black md:hidden">
          <div className="flex flex-col gap-4 p-4">
            <button onClick={(e) => navigate("/")}>Home</button>
            {currentUser ? (
              <>
                <button onClick={(e) => navigate("/my-booking")}>
                  Booking
                </button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={(e) => navigate("/login")}>Login</button>
                <button onClick={(e) => navigate("/signup")}>SignUp</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
