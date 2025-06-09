import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

export const UpdateCarModal = ({ car ,setCars}) => {
  const handleUpdateCar = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedCar = Object.fromEntries(formData.entries());
    updatedCar.features = updatedCar.features
      .split(",")
      .map((req) => req.trim());

    axios
      .put(`http://localhost:3000/cars/${car._id}`, updatedCar)
      .then((result) => {
        console.log(result);
        if (result.data.modifiedCount) {
          document.getElementById("updateCarModal").close();
          setCars(prevCars =>
            prevCars.map(c => (c._id === car._id ? { ...c, ...updatedCar } : c))
          );
          Swal.fire({
            icon: "success",
            title: "The Car its Updated",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(updatedCar);
  };
  return (
    <dialog id="updateCarModal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form
          onSubmit={handleUpdateCar}
          className="text-black grid grid-cols-2 gap-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-500 my-6 col-span-2">
            Update Car
          </h1>

          <div>
            <label className="font-bold">Car Model</label>
            <input
              type="text"
              name="car_model"
              defaultValue={car.car_model}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Daily Rental Price ($)</label>
            <input
              type="number"
              name="rental_price"
              defaultValue={car.rental_price}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Availability</label>
            <select
              name="availability"
              defaultValue={car.availability}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            >
              <option className="text-black" value={car.availability}>
                {car.availability}
              </option>
              <option className="text-black" value={car.availability === "Not Available"? "Available" : "Not Available"}>
                {car.availability === "Not Available"? "Available" : "Not Available"}
              </option>
            </select>
          </div>

          <div>
            <label className="font-bold">Vehicle Registration Number</label>
            <input
              type="text"
              name="reg_number"
              defaultValue={car.reg_number}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Features</label>
            <input
              type="text"
              name="features"
              defaultValue={car.features}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Description</label>
            <textarea
              name="description"
              defaultValue={car.description}
              className="w-full px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Image URL</label>
            <input
              type="text"
              name="image_url"
              defaultValue={car.image_url}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <div>
            <label className="font-bold">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={car.location}
              className="w-full h-10 px-2 my-2 border border-black rounded-sm bg-transparent"
              required
            />
          </div>

          <button className="col-span-2 btn w-full my-4 bg-orange-500 hover:bg-orange-600 text-white border-0">
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
