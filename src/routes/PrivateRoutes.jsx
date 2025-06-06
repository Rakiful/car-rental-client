import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

export const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to={"/signIn"}></Navigate>;
  }

  return children;
};
