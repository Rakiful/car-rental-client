import React from 'react';
import { FaCarSide, FaDollarSign, FaCalendarCheck, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    icon: <FaCarSide className="text-5xl text-orange-500 mx-auto mb-4" />,
    title: 'Wide Variety of Cars',
    description: 'From budget-friendly options to luxury vehicles.',
  },
  {
    id: 2,
    icon: <FaDollarSign className="text-5xl text-orange-500 mx-auto mb-4" />,
    title: 'Affordable Prices',
    description: 'Competitive daily rates you can count on.',
  },
  {
    id: 3,
    icon: <FaCalendarCheck className="text-5xl text-orange-500 mx-auto mb-4" />,
    title: 'Easy Booking Process',
    description: 'Seamlessly book your ride in just a few clicks.',
  },
  {
    id: 4,
    icon: <FaHeadset className="text-5xl text-orange-500 mx-auto mb-4" />,
    title: 'Customer Support',
    description: '24/7 assistance for all your queries.',
  },
];

export const WhyChooseUs = () => {
  return (
    <div className="container mx-auto my-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
        Why Choose Us?
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Discover the benefits that make us your best choice for renting a car.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-md rounded-2xl p-6"
          >
            {item.icon}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
