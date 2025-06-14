import React from "react";
import { Link } from "react-router";

export const NoBookingsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-100">
      <p className="text-center text-xl text-gray-800">
        No bookings added yet.
      </p>
      <p className="text-center text-xl text-gray-800">
        Go to Available Cars Page and, Add one now!
      </p>
      <Link to={"/availableCars"}>
        <button className="btn text-white bg-orange-500 hover:bg-orange-600">
          Available Cars
        </button>
      </Link>
    </div>
  );
};
