import React, { useContext } from "react";
import axios from "axios";
import bg_image from "../../assets/banner_car2.png";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

export const AddCar = () => {
  const { user } = useContext(AuthContext);

  const handleAddCar = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCar = Object.fromEntries(formData.entries());
    newCar.bookingCount = 0;
    newCar.features = newCar.features.split(",").map((req) => req.trim());
    newCar.userName = user?.displayName;
    newCar.userEmail = user?.email;
    newCar.date = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    axios
      .post("http://localhost:3000/cars", newCar)
      .then((result) => {
        if (result.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "This New Car Added",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });

    // console.log(newCar);
  };

  return (
    <div
      className="relative bg-cover bg-center py-10 flex items-center justify-center"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="bg-orange-200/50 px-4 mx-3 rounded-md w-full max-w-3xl">
        <form onSubmit={handleAddCar} className="text-black">
          <h1 className="text-4xl md:text-5xl text-orange-500 font-bold text-center my-6">
            Add Car
          </h1>

          <label className="font-bold">Car Model</label>
          <input
            type="text"
            name="car_model"
            placeholder="Car Model"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Daily Rental Price ($)</label>
          <input
            type="number"
            name="rental_price"
            placeholder="e.g. 50"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Availability</label>
          <select
            name="availability"
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

          <label className="font-bold">Vehicle Registration Number</label>
          <input
            type="text"
            name="reg_number"
            placeholder="e.g. XYZ-1234"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Features (separate by comma)</label>
          <input
            type="text"
            name="features"
            placeholder="e.g. GPS, AC, Bluetooth"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Car details..."
            className="w-full px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Image URL</label>
          <input
            type="text"
            name="image_url"
            placeholder="https://image-link.com"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <label className="font-bold">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. New York"
            className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
            required
          />

          <button className="btn w-full my-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
