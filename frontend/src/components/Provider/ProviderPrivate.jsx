import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const ProviderPrivate = () => {
  const { currentProvider } = useSelector((state) => state.provider);

  return currentProvider ? <Outlet /> : <Navigate to="/login-provider" />;
};

export default ProviderPrivate;
