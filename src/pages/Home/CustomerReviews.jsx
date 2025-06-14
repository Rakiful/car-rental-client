import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

export const CustomerReviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((resp) => resp.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const comment = e.target.comment.value;

    const newComment = {
      comment,
      name: user.displayName,
      email: user.email,
      image: user.photoUrl || "",
    };

    axios
      .post("http://localhost:3000/reviews", newComment)
      .then((result) => {
        if (result.data.insertedId) {
          Swal.fire({
            title: "Review Added Successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          fetch("http://localhost:3000/reviews")
            .then((resp) => resp.json())
            .then((data) => setTestimonials(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(newComment);
    setShowForm(true);
  };

  if (loading) {
    return <span>loading</span>;
  }

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
                src={
                  user.image
                    ? user.image
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600">{user.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {user && (
        <>
          {showForm ? (
            <div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn text-white bg-orange-500 hover:bg-orange-600"
              >
                Add Your Review
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleReviewSubmit}
              className="my-4 flex flex-col justify-center items-center gap-3"
            >
              <textarea
                required
                type="text"
                name="comment"
                placeholder="Write your comment"
                className="md:w-1/2 p-3 border border-orange-500  textarea-primary"
              />
              <div>
                <button
                  type="submit"
                  className="btn text-white bg-orange-500 hover:bg-orange-600"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(!showForm)}
                  className="btn text-white bg-red-500 hover:bg-red-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};
