import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export const SpecialOffers = ({ offers }) => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-12">
        Special Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
            }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 text-center flex flex-col justify-between"
          >
            <div className="text-5xl text-orange-500 mb-4">🔥</div>
            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-4">{offer.description}</p>
            <div>
              <Link
                to={"/availableCars"}
                className="btn bg-orange-500 text-white border-0 hover:bg-orange-600"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
