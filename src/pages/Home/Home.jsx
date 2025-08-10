import React, { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { WhyChooseUs } from "./WhyChooseUs";
import { CustomerReviews } from "./CustomerReviews";
import { SpecialOffers } from "./SpecialOffers";
import { RecentListings } from "./RecentListings";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [recentCars, setRecentCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cars/recent")
      .then((resp) => resp.json())
      .then((data) => {
        setRecentCars(data);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentListings recentCars={recentCars} />
      <SpecialOffers offers={offers} />
      <CustomerReviews />
    </div>
  );
};
