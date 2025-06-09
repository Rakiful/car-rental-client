import React from "react";
import { CarsCard } from "../Shared/CarsCard";

export const CarsGridView = ({ availableCars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 px-4">
      {availableCars.map((car) => (
        <CarsCard key={car._id} car={car}/>
      ))}
    </div>
  );
};
