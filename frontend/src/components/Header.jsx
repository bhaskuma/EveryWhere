import React from "react";
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

  const handleLogout = () => {
    try {
      dispatch(clearSubscription());
      dispatch(signOutStart());
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  return (
    <div className="bg-black h-16 w-screen text-white flex flex-row justify-between items-center">
      <div className="flex flex-row p-auto gap-5 items-center">
        <img src={logo} alt="Logo" className="h-10 rounded-sm ml-2" />
        <span className="text-white text-3xl font-bold hover:text-gray-300 transition-colors">
          EveryWhere
        </span>
      </div>

      <div className="flex gap-5 mr-3 justify-center ">
        <button>Home</button>
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
    </div>
  );
};
