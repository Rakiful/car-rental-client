import React from "react";
import { CarsCard } from "../Shared/CarsCard";

export const RecentListings = ({ recentCars }) => {
  return (
    <div className="container mx-auto px-3">
      <h1 className="text-4xl md:text-5xl text-center font-bold text-orange-500 mb-6">
        Recent Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-20">
        {recentCars.map((car) => (
          <CarsCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};
