import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaClock,
  FaCheck,
  FaDollarSign,
  FaCar,
  FaMapMarkerAlt,
  FaThList,
} from "react-icons/fa";
import { BookingModal } from "./BookingModal";

export const CarDetails = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      });
  }, [id]);

  const handleModal = () => {
    document.getElementById("bookingCarModal").showModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <figure className="lg:w-1/2 rounded-xl">
          <img
            src={car.image_url}
            alt={car.car_model}
            className="w-full h-full object-cover rounded-xl"
          />
        </figure>
        <div className="card-body lg:w-1/2 space-y-3">
          <h1 className="text-3xl lg:text-5xl font-bold text-orange-500 text-center lg:text-left">
            {car.car_model}
          </h1>

          <p className="flex items-center text-2xl gap-2 ">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Price Per Day:</span>{" "}
            <span className="text-blue-700 font-bold">{car.rental_price}$</span>
          </p>

          <p className="flex items-center gap-2 text-lg">
            <FaCar className="text-blue-600" />
            <span className="font-semibold">Availability:</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <FaCheck /> {car.availability}
            </span>
          </p>

          <p className="flex items-center gap-2 text-lg">
            <FaClock className="text-purple-600" />
            <span className="font-semibold">Date Added:</span> {car.date}
          </p>

          <p className="flex items-center gap-2 text-lg">
            <FaMapMarkerAlt className="text-red-600" />
            <span className="font-semibold">Location:</span> {car.location}
          </p>

          <div className="flex items-center gap-2 mt-2 text-lg">
            <FaThList className="text-yellow-600" />
            <span className="font-semibold">Features:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {car.features?.map((feature, idx) => (
              <span
                key={idx}
                className="badge badge-outline badge-accent px-3 py-2 text-sm font-semibold"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-3">
            <span className="font-semibold text-lg">Shared By:</span>{" "}
            {car.userName}
          </p>

          <div className="mt-2">
            <span className="font-semibold text-lg">Description:</span>
            <p className="text-gray-700">{car.description}</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => handleModal()}
              className="btn bg-orange-500 text-white hover:bg-orange-600 w-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <BookingModal car={car} />
    </div>
  );
};
