import React, { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { WhyChooseUs } from "./WhyChooseUs";
import { CustomerReviews } from "./CustomerReviews";
import { SpecialOffers } from "./SpecialOffers";
import { RecentListings } from "./RecentListings";

export const Home = () => {
  const [recentCars , setRecentCars] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/cars/recent")
    .then(resp=>resp.json())
    .then(data=>setRecentCars(data))
  },[])

  const testimonials = [
    {
      id: 1,
      name: "Rakiful",
      comment:
        "The booking process was seamless and the car was in great condition!",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKbEzRjT3LfXcgFpFtJV4fIqZ97deJcdno93fxzgxTW4mRO9DX9=s96-c",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "Great selection of cars and excellent customer service.",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Michael Johnson",
      comment: "I loved the convenience and affordability. Will rent again!",
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Emily Davis",
      comment: "Very user-friendly platform. Found my perfect car in minutes!",
      image: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "John Doe",
      comment:
        "The booking process was seamless and the car was in great condition!",
      image: "https://i.pravatar.cc/100?img=1",
    },
  ];

  const offers = [
    {
      id: 1,
      title: "Get 15% off for weekend rentals!",
      description: "Enjoy exclusive discounts on all cars every weekend.",
    },
    {
      id: 2,
      title: "Luxury cars at $99/day this holiday season!",
      description: "Ride in style with our limited-time luxury car promo.",
    },
    {
      id: 3,
      title: "Free upgrades on your first booking!",
      description:
        "Experience better rides at no extra cost on your first rental.",
    },
    {
      id: 4,
      title: "Refer & Earn Rewards!",
      description: "Invite friends and earn discounts on your next rental.",
    },
  ];

  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentListings recentCars={recentCars}/>
      <SpecialOffers offers={offers} />
      <CustomerReviews testimonials={testimonials} />
    </div>
  );
};
