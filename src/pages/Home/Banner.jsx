import React from "react";
import { Link } from "react-router";
import banner_image from "../../assets/banner_car.png";

export const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] lg:h-[80vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${banner_image})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="z-10 text-center lg:text-left text-white px-4 container mx-auto ">
        <h1 className="text-4xl md:text-7xl md:w-200 font-bold drop-shadow-lg">
          Drive Your Dreams Today!
        </h1>
        <Link to="/availableCars">
          <button className="mt-6 btn border-0 bg-orange-500 shadow-md text-white hover:scale-105 hover:bg-orange-600 transition-transform">
            View Available Cars
          </button>
        </Link>
      </div>
    </div>
  );
};
