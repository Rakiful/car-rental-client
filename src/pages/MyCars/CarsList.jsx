import React, { useEffect, useState } from "react";
import { NoCarsFound } from "./NoCarsFound";
import { UpdateCarModal } from "./UpdateCarModal";
import Swal from "sweetalert2";
import axios from "axios";

export const CarsList = ({ myCarsPromise }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState({});
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    myCarsPromise
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log("Failed to fetch cars:", error);
      });
  }, [myCarsPromise]);

  const sortedCars = [...cars].sort((a, b) => {
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
          .then((res) => {
            if (res.data.deletedCount) {
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
            // console.log("Delete error:", error);
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

  if (cars.length === 0) {
    return <NoCarsFound />;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mr-3 md:mr-0">
        <select
          className="btn border border-orange-500 text-orange-500 font-bold my-4 "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="newest">Date Added : Newest First</option>
          <option value="oldest">Date Added : Oldest First</option>
          <option value="highest">Price: Highest Price</option>
          <option value="lowest">Price: Lowest Price</option>
        </select>
      </div>
      <table className="table text-center mx-3 md:mx-0">
        <thead className="bg-orange-300">
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
          {sortedCars.map((car) => (
            <tr key={car._id} className="hover:bg-orange-200 transition duration-300">
              <td>
                <div className="flex items-center justify-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={car.image_url} alt={car.car_model} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{car.car_model}</td>
              <td>{car.rental_price} $</td>
              <td>{car.bookingCount}</td>
              <td>
                {car.availability === "Available" ? (
                  <p className="badge bg-green-500 text-white">
                    {car.availability}
                  </p>
                ) : (
                  <p className="badge bg-red-500 text-white">
                    {car.availability}
                  </p>
                )}
              </td>
              <td>{car.date}</td>
              <td>
                <div className="flex gap-2 justify-center">
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
