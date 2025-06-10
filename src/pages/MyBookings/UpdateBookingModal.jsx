import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCar, FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";

export const UpdateBookingModal = ({ booking, setBookings }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const toInputDateTime = (dateStr) => {
    if (!dateStr) return "";

    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour = "00", minute = "00"] = (timePart || "00:00").split(":");

    return `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  };

  const formatDisplayDateTime = (dateStr) => {
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
    setStartDate(toInputDateTime(booking?.start_date));
    setEndDate(toInputDateTime(booking?.end_date));
    setTotalCost(booking?.totalCost || 0);
  }, [booking]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end - start;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const cost = days > 0 ? days * parseFloat(booking.perDayRent) : 0;
      setTotalCost(cost);
    } else {
      setTotalCost(0);
    }
  }, [startDate, endDate, booking.perDayRent]);

  const handleUpdateBooking = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getTime() === end.getTime()) {
      document.getElementById("updateBookingModal")?.close();
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "Start and End date/time cannot be the same. Please select a valid range.",
      });
      return;
    }

    if (end < start) {
      document.getElementById("updateBookingModal")?.close();
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "End date/time cannot be before Start date/time.",
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const updatedBooking = Object.fromEntries(formData.entries());
    updatedBooking.start_date = formatDisplayDateTime(startDate);
    updatedBooking.end_date = formatDisplayDateTime(endDate);
    updatedBooking.totalCost = totalCost;

    axios
      .put(`http://localhost:3000/bookings/${booking._id}`, updatedBooking)
      .then((result) => {
        if (result.data.modifiedCount) {
          document.getElementById("updateBookingModal")?.close();
          setBookings((prev) =>
            prev.map((b) =>
              b._id === booking._id ? { ...b, ...updatedBooking } : b
            )
          );
          Swal.fire({
            icon: "success",
            title: "Booking Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong while updating the booking.",
        });
      });
  };

  return (
    <dialog id="updateBookingModal" className="modal">
      <div className="modal-box">
        <form
          onSubmit={handleUpdateBooking}
          className="text-black flex flex-col gap-3"
        >
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Modify Booking
          </h1>
          <h1 className=" text-2xl md:text-3xl font-bold text-center text-orange-500 mb-6 flex items-center justify-center gap-2">
            <FaCar className="text-blue-600" />
            {booking.car_model}
          </h1>

          <div>
            <label className="font-bold">
              Previous Start Date & Time ({booking.start_date})
            </label>
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
            <label className="font-bold">
              Previous End Date & Time ({booking.end_date})
            </label>
            <input
              type="datetime-local"
              name="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <p className="flex items-center text-xl gap-2">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Total Cost:</span>
            <span className="text-blue-700 font-bold">{totalCost}$</span>
          </p>

          <button className="btn w-full my-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
            Modify Booking
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
