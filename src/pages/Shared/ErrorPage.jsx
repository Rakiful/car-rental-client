import React from "react";
import { Link } from "react-router";
import error from "../../assets/error_logo.png";

export const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <img src={error} alt="Error" className="max-w-full w-[300px] mb-6" />
      <h2 className="text-3xl font-semibold text-orange-500 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn bg-orange-500 text-white hover:bg-orange-700">
        Go Back Home
      </Link>
    </div>
  );
};
