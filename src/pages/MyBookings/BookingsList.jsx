import React, { useEffect, useState } from "react";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import { UpdateBookingModal } from "./UpdateBookingModal";
import Swal from "sweetalert2";
import axios from "axios";
import { NoBookingsFound } from "./NoBookingsFound";

export const BookingsList = ({ myBookingsPromise }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState({});

  useEffect(() => {
    myBookingsPromise
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log("Failed to fetch bookings:", error);
      });
  }, [myBookingsPromise]);

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    document.getElementById("updateBookingModal").showModal();
  };

  const handleCancel = (booking) => {
    const newData = { status: "Cancelled" };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this Booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3000/bookings/${booking._id}`, newData)
          .then((res) => {
            if (res.data.modifiedCount) {
              setBookings((prev) =>
                prev.map((b) =>
                  b._id === booking._id ? { ...b, status: "Cancelled" } : b
                )
              );
              Swal.fire({
                title: "Cancelled!",
                text: "Your Booking Cancelled",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
      </div>
    );
  }
  
  if (bookings.length === 0) {
    return <NoBookingsFound/>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table text-center">
        <thead className="bg-orange-300">
          <tr>
            <th>Car Image</th>
            <th>Car Model</th>
            <th>Booking Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-orange-100">
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="hover:bg-orange-200 transition duration-300"
            >
              <td>
                <div className="flex items-center justify-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={booking.image_url} alt={booking.car_model} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{booking.car_model}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.start_date}</td>
              <td>{booking.end_date}</td>
              <td>{booking.totalCost}$</td>

              <td>
                {booking.status === "Cancelled" ? (
                  <p className="badge bg-red-300 p-4 font-bold">
                    {booking.status}
                  </p>
                ) : (
                  <p className="badge bg-green-300 p-4 font-bold">
                    {booking.status}
                  </p>
                )}
              </td>
              <td>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(booking)}
                    className="btn bg-blue-600 text-white"
                  >
                    <FaCalendarAlt className="mr-1" /> Modify Date
                  </button>

                  {booking.status === "Cancelled" ? (
                    <button className="btn bg-red-300 text-white cursor-not-allowed pointer-events-none">
                      Cancelled
                    </button>
                  ) : (
                    <button
                      disabled={booking.status === "Cancelled"}
                      onClick={() => handleCancel(booking)}
                      className="btn bg-red-600 text-white"
                    >
                      <FaTrash className="mr-1" /> Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateBookingModal booking={selectedBooking} setBookings={setBookings} />
    </div>
  );
};
