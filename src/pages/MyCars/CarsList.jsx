import React, { useEffect, useState } from "react";
import { NoCarsFound } from "./NoCarsFound";
import { UpdateCarModal } from "./UpdateCarModal";
import Swal from "sweetalert2";
import axios from "axios";

export const CarsList = ({ myCarsPromise }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});

  useEffect(() => {
    myCarsPromise.then(setCars);
  }, [myCarsPromise]);

  const handleEdit = (car) => {
    setSelectedCar(car);
    document.getElementById("updateCarModal").showModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/cars/${id}`)
          .then((result) => {
            if (result.data.deletedCount) {
              setCars((prevCars) => prevCars.filter((car) => car._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your car has been deleted.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
          });
      }
    });
  };

  if (cars.length === 0) {
    return <NoCarsFound />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table text-center">
        <thead className="bg-orange-200">
          <tr>
            <th>Car Image</th>
            <th>Car Model</th>
            <th>Daily Rental Price</th>
            <th>Booking Count</th>
            <th>Availability</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-orange-100">
          {cars.map((car) => (
            <tr key={car._id}>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={car.image_url}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{car.car_model}</td>
              <td>{car.rental_price}</td>
              <td>{car.bookingCount}</td>
              <td>{car.availability}</td>
              <td>{car.date}</td>
              <td>
                <div>
                  <button
                    onClick={() => handleEdit(car)}
                    className="btn bg-blue-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateCarModal car={selectedCar} setCars={setCars} />
    </div>
  );
};
