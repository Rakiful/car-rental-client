import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import axios from "axios";
import {
  FaClock,
  FaDollarSign,
  FaCar,
  FaMapMarkerAlt,
  FaThList,
} from "react-icons/fa";
import Swal from "sweetalert2";

export const PricingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const [car, setCar] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  // Fetch car data
  useEffect(() => {
    axios.get(`http://localhost:3000/api/pricing/${id}`).then((res) => {
      setCar(res.data);
      setLoading(false);
    });
  }, [id]);

  // Set default startDate on car load
  useEffect(() => {
    if (car) {
      const now = new Date();
      const formattedStart = now.toISOString().slice(0, 16);
      setStartDate(formattedStart);
    }
  }, [car]);

  // Update endDate & totalCost when startDate or plan changes
  useEffect(() => {
    if (!startDate || !plan || !car) return;

    const start = new Date(startDate);
    let end = new Date(start);

    if (plan === "weekly") {
      end.setDate(end.getDate() + 7);
    } else if (plan === "monthly") {
      end.setDate(end.getDate() + 30);
    }

    setEndDate(end.toISOString().slice(0, 16));
    setTotalCost(car.rentalPlans[plan]);
  }, [startDate, plan, car]);

  const handleBooking = () => {
    Swal.fire({
      icon: "info",
      title: "Coming Soon",
      text: "Booking with plan features coming soon!",
      confirmButtonColor: "#f97316", // orange shade
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner lg:p-10 loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <figure className="lg:w-1/2 rounded-xl m-5">
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
            <span className="font-semibold">
              {plan.charAt(0).toUpperCase() + plan.slice(1)} Rent:
            </span>{" "}
            <span className="text-blue-700 font-bold">
              ${totalCost.toFixed(2)}
            </span>
          </p>

          <p className="flex items-center gap-2 text-lg">
            <FaCar className="text-blue-600" />
            <span className="font-semibold">Availability:</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              {car.availability}
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

          <div className="mb-4 mt-6">
            <label className="block font-semibold mb-1">Start Date</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">End Date</label>
            <input
              type="datetime-local"
              value={endDate}
              readOnly
              className="border rounded px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleBooking}
            className="btn bg-orange-500 text-white hover:bg-orange-600 w-full"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};
