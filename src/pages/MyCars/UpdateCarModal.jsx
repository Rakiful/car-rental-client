import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UpdateCarModal = ({ car, setCars }) => {
  const [formValues, setFormValues] = useState({
    car_model: "",
    rental_price: "",
    availability: "Available",
    reg_number: "",
    features: "",
    description: "",
    image_url: "",
    location: "",
  });

  useEffect(() => {
    if (car && car._id) {
      setFormValues({
        car_model: car.car_model || "",
        rental_price: car.rental_price || "",
        availability: car.availability || "Available",
        reg_number: car.reg_number || "",
        description: car.description || "",
        image_url: car.image_url || "",
        location: car.location || "",
        features: Array.isArray(car.features)
          ? car.features.join(", ")
          : car.features || "",
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCar = (e) => {
    e.preventDefault();
    const updatedCar = {
      ...formValues,
      features: formValues.features.split(",").map((f) => f.trim()),
    };

    axios
      .put(`http://localhost:3000/cars/${car._id}`, updatedCar)
      .then((result) => {
        if (result.data.modifiedCount) {
          document.getElementById("updateCarModal").close();
          setCars((prevCars) =>
            prevCars.map((c) =>
              c._id === car._id ? { ...c, ...updatedCar } : c
            )
          );
          Swal.fire({
            icon: "success",
            title: "The Car has been updated",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <dialog id="updateCarModal" className="modal">
      <div className="modal-box max-w-5xl">
        <form
          onSubmit={handleUpdateCar}
          className="text-black grid grid-cols-1 md:grid-cols-2 md:gap-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-500 my-6 md:col-span-2">
            Update Car
          </h1>

          <div>
            <label className="font-bold">Car Model</label>
            <input
              type="text"
              name="car_model"
              value={formValues.car_model}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Daily Rental Price ($)</label>
            <input
              type="number"
              name="rental_price"
              value={formValues.rental_price}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Availability</label>
            <select
              name="availability"
              value={formValues.availability}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            >
              <option className="text-black" value="Available">
                Available
              </option>
              <option className="text-black" value="Not Available">
                Not Available
              </option>
            </select>
          </div>

          <div>
            <label className="font-bold">Vehicle Registration Number</label>
            <input
              type="text"
              name="reg_number"
              value={formValues.reg_number}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Features</label>
            <input
              type="text"
              name="features"
              value={formValues.features}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formValues.image_url}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={formValues.location}
              onChange={handleChange}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <button className="md:col-span-2 btn w-full my-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
            Update
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
