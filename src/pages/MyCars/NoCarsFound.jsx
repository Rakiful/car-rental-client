import React from "react";
import { Link } from "react-router";

export const NoCarsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-100">
      <p className="text-center text-xl text-gray-800">No cars added yet. Add one now!</p>
      <Link to={"/addCar"}><button className="btn text-white bg-orange-500 hover:bg-orange-600">Add Car</button></Link>
    </div>
  );
};
