import React, { useContext, useState, useEffect } from "react";
import { FaCheck, FaDollarSign, FaCar } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export const BookingModal = ({ car, setBookingCount }) => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end - start;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const cost = days > 0 ? days * parseFloat(car.rental_price) : 0;
      setTotalCost(cost);
    } else {
      setTotalCost(0);
    }
  }, [startDate, endDate, car.rental_price]);

  const handleBooking = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now || end < now) {
      document.getElementById("bookingCarModal").close();
      Swal.fire({
        icon: "warning",
        title: "Invalid Date/Time",
        text: "Start or End time cannot be in the past.",
      });
      return;
    }

    if (startDate === endDate || start.getTime() === end.getTime()) {
      document.getElementById("bookingCarModal").close();
      Swal.fire({
        icon: "warning",
        title: "Invalid Date/Time",
        text: "Start and End date/time cannot be the same. Please select valid range.",
      });
      return;
    }

    if (end < start) {
      document.getElementById("bookingCarModal").close();
      Swal.fire({
        icon: "warning",
        title: "Invalid Date/Time",
        text: "End date/time cannot be before Start date/time.",
      });
      return;
    }

    const diffMs = end - start;
    const sixHoursMs = 6 * 60 * 60 * 1000;

    if (diffMs < sixHoursMs) {
      document.getElementById("bookingCarModal").close();
      Swal.fire({
        icon: "warning",
        title: "Minimum Booking Time Required",
        text: "The minimum booking duration is 6 hours.",
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const newBooking = Object.fromEntries(formData.entries());

    newBooking.car_model = car.car_model;
    newBooking.image_url = car.image_url;
    newBooking.perDayRent = car.rental_price;
    newBooking.status = "Confirmed";
    newBooking.totalCost = totalCost;
    newBooking.userName = user.displayName;
    newBooking.userEmail = user.email;
    newBooking.bookingDate = formatDateTime(new Date());
    newBooking.start_date = formatDateTime(startDate);
    newBooking.end_date = formatDateTime(endDate);

    axios
      .post("http://localhost:3000/bookings", newBooking)
      .then((result) => {
        if (result.data.insertedId) {
          axios
            .put(
              `http://localhost:3000/cars/booking-count/${car._id}`
            )
            .then((result) => {
              if (result.data.modifiedCount) {
                setBookingCount(car.bookingCount + 1);
                document.getElementById("bookingCarModal").close();
                Swal.fire({
                  icon: "success",
                  title: `${car.car_model} Booking Confirmed`,
                  showConfirmButton: false,
                  timer: 2000,
                });
                // console.log(result);
              }
            });
        }
      })
      .catch((error) => {
        // console.log(error);
      });

    // console.log(newBooking);
  };

  return (
    <dialog id="bookingCarModal" className="modal">
      <div className="modal-box">
        <form
          onSubmit={handleBooking}
          className="text-black flex flex-col gap-3"
        >
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Booking Confirmation
          </h1>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-500 mb-6">
            You are booking: {car.car_model}
          </h1>

          <p className="flex items-center text-sm md:text-lg gap-2">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Price Per Day:</span>{" "}
            <span className="text-blue-700 font-bold">{car.rental_price}$</span>
          </p>

          <p className="flex items-center gap-2 text-sm md:text-lg">
            <FaCar className="text-blue-600" />
            <span className="font-semibold">Availability:</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <FaCheck /> {car.availability}
            </span>
          </p>

          <div>
            <label className="font-bold">Start Date & Time</label>
            <input
              type="datetime-local"
              name="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">End Date & Time</label>
            <input
              type="datetime-local"
              name="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <p className="flex items-center text-xl md:text-2xl gap-2">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Total Cost:</span>{" "}
            <span className="text-blue-700 font-bold">{totalCost}$</span>
          </p>

          <button className="col-span-2 btn w-full my-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
            Confirm Booking
          </button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-red-500 text-white btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
