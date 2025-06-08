import React, { use } from "react";
import { NoCarsFound } from "./NoCarsFound";

export const CarsList = ({ myCarsPromise }) => {
  const cars = use(myCarsPromise);
  console.log(cars);

  if (cars.length === 0) {
    return <NoCarsFound />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
          {cars.map((car)=>
             <tr key={car._id}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
              </div>
            </td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>10,000</td>
            <td>1</td>
            <td>Available</td>
            <td>8 june 2025</td>
            <td>
              <div>
                <button className="btn bg-blue-600 text-white">Edit</button>
                <button className="btn bg-red-600 text-white">Delete</button>
              </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
