import React, { useEffect, useState } from "react";
import { CarsGridView } from "./carsGridView";
import { CarsListView } from "./CarsListView";

export const AvailableCars = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(true);
  const [availableCars, setAvailableCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch(`https://car-rental-server-chi.vercel.app/cars/available`)
      .then((resp) => resp.json())
      .then((data) => {
        setAvailableCars(data);
        setLoading(false);
      });
  }, []);

  const filteredCars = availableCars.filter((car) =>
    `${car.car_model} ${car.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "highest") {
      return Number(b.rental_price) - Number(a.rental_price);
    } else if (sortBy === "lowest") {
      return Number(a.rental_price) - Number(b.rental_price);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-8">
        Available Cars
      </h2>
      <div className="px-3 lg:flex justify-between">
        <div className="mb-3">
          <input
            className="border rounded p-2 w-full lg:w-100 border-orange-500"
            type="text"
            placeholder="Search by car model or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 justify-between ">
          <select
            className="btn w-1/2 border border-orange-500 text-orange-500 font-bold"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="newest">Date Added : Newest First</option>
            <option value="oldest">Date Added : Oldest First</option>
            <option value="highest">Price: Highest Price</option>
            <option value="lowest">Price: Lowest Price</option>
          </select>
          <button
            onClick={() => setView(!view)}
            className="btn w-1/2 text-white bg-orange-500 hover:bg-orange-600"
          >
            Toggle to {view ? "List" : "Grid"} View
          </button>
        </div>
      </div>
      <div className="mt-5 min-h-[50vh]">
        {view ? (
          <>
            <CarsGridView availableCars={sortedCars} />
          </>
        ) : (
          <>
            <CarsListView availableCars={sortedCars} />
          </>
        )}
      </div>
    </div>
  );
};
