import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../pages/Shared/Navbar";
import { Footer } from "../pages/Shared/Footer";

export const RootLayouts = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-base-100 shadow">
        <Navbar />
      </div>
      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
