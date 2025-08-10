import React, { useEffect, useState } from "react";
import axios from "axios";
import { PricingCard } from "../Shared/PricingCard";

export const Pricing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pricing")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-8">
        Our Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10  px-4">
        {cars.map((car) => (
          <PricingCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};
