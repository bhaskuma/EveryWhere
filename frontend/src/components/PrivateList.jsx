import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateList = () => {
  const { subscription } = useSelector((state) => state.subscription);
  const { currentUser } = useSelector((state) => state.user);
  console.log(subscription);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate("/login");
    } else if (!subscription || subscription.status !== "active") {
      // If logged in but no active subscription, navigate to provider list
      navigate("/plan");
    }
  }, [currentUser, subscription, navigate]);

  return <Outlet />; // Render child routes if the user is logged in and has a valid subscription
};

export default PrivateList;
