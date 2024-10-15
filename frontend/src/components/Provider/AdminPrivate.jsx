import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
    } else if (currentUser.role !== 1) {
      // If the user is logged in but not an admin, redirect to home page
      navigate("/");
    }
  }, [currentUser, navigate]);

  // If the user is logged in and an admin, render the protected component
  if (currentUser && currentUser.role === 1) {
    return children;
  }

  // While the auth status is being determined, return null or a loader
  return null;
};

export default AdminPrivate;
