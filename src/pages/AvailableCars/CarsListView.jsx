import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import { FaClock } from "react-icons/fa";
import { IoCar } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const CarsListView = ({ availableCars }) => {
  return (
    <div className="">
      {availableCars.map((car) => (
        <motion.div
          key={car._id}
          className="flex mb-5 justify-between shadow-lg mx-4"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, delay: 1 * 0 }}
          viewport={{ once: true }}
        >
          <div className="lg:flex md:flex lg:w-3/4 items-center">
            <figure className="px-2 pt-2 lg:px-10  lg:py-10 w-2/3 md:w-1/3 lg:w-1/3">
              <img
                src={car.image_url}
                alt="cars image"
                className="rounded-xl"
              />
            </figure>
            <div className="p-3 lg:p-0 ">
              <h2 className="card-title text-2xl font-bold text-orange-500">
                {car.car_model}
              </h2>
              <h2 className="card-title text-md font-bold ">
                {" "}
                Daily Rent:{" "}
                <span className="text-blue-700"> {car.rental_price}$</span>
              </h2>
              <p className="flex items-center gap-2 font-bold text-green-500">
                <FaCheck />
                {car.availability}
              </p>
              <p className="flex items-center gap-2">
                <IoCar /> Bookings : {car.bookingCount}
              </p>
              <p className="flex items-center gap-2">
                <FaClock /> Posted by :{" "}
                {dayjs(car.date).isToday()
                  ? "Today"
                  : dayjs(car.date).fromNow()}
              </p>
              <p className="flex items-center gap-2">
                <IoLocationSharp /> Location : {car.location}
              </p>
              <p className="max-h-25 lg:h-10 overflow-hidden">
                {car.description}
              </p>
            </div>
          </div>
          <div className="flex items-center mr-5">
            <Link to={`/cars/${car._id}`} className="btn text-white bg-orange-500 hover:bg-orange-600 w-full">
              Book Now
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
