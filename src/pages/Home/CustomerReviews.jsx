import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export const CustomerReviews = ({ testimonials }) => {
  return (
    <div className="my-20 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((user) => (
          <SwiperSlide key={user.id}>
            <div className="bg-white shadow-md rounded-2xl p-6 m-5">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600">{user.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
