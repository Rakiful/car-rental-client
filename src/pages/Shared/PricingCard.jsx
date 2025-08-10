import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import { FaClock, FaCheck } from "react-icons/fa";
import { IoCar, IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const PricingCard = ({ car }) => {
  const postDate = dayjs(car.date);
  const timeAgo = postDate.isToday() ? "Today" : postDate.fromNow();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="card bg-base-100 shadow-lg">
        <figure className="px-5 pt-5 lg:h-50">
          <img src={car.image_url} alt="Car" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold text-orange-500">
            {car.car_model}
          </h2>

          {/* Weekly / Monthly Pricing */}
          <div className="w-full my-2">
            <p className="font-bold text-md">
              Weekly: <span className="text-blue-700">${car.rentalPlans?.weekly}</span>
            </p>
            <p className="font-bold text-md">
              Monthly: <span className="text-blue-700">${car.rentalPlans?.monthly}</span>
            </p>
          </div>

          <p className="flex items-center gap-2 font-bold text-green-500">
            <FaCheck />
            {car.availability}
          </p>
          <p className="flex items-center gap-2">
            <IoCar /> Bookings: {car.bookingCount}
          </p>
          <p className="flex items-center gap-2">
            <FaClock /> Posted: {timeAgo}
          </p>
          <p className="flex items-center gap-2">
            <IoLocationSharp /> {car.location}
          </p>
          <p className="h-10 overflow-hidden">{car.description}</p>

          <div className="card-actions w-full flex gap-2">
            <Link
              to={`/pricing/${car._id}?plan=weekly`}
              className="btn text-white bg-orange-500 hover:bg-orange-600 w-full"
            >
              Weekly Plan
            </Link>
            <Link
              to={`/pricing/${car._id}?plan=monthly`}
              className="btn text-white bg-blue-500 hover:bg-blue-600 w-full"
            >
              Monthly Plan
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
