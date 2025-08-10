import React from "react";
import { createBrowserRouter } from "react-router";
import { RootLayouts } from "../layouts/RootLayouts";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
import { Register } from "../pages/Register/Register";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import { AvailableCars } from "../pages/AvailableCars/AvailableCars";
import { ErrorPage } from "../pages/Shared/ErrorPage";
import { AddCar } from "../pages/AddCar/AddCar";
import { MyCars } from "../pages/MyCars/MyCars";
import { CarDetails } from "../pages/CarDetails/CarDetails";
import { MyBookings } from "../pages/MyBookings/MyBookings";
import { MyProfile } from "../pages/MyProfile/MyProfile";
import { Pricing } from "../pages/Pricing/Pricing";
import { PricingDetails } from "../pages/PricingDetails/PricingDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signIn",
        element: <SignIn/>,
      },
      {
        path: "/signUp",
        element: <Register/>,
      },
      {
        path: "/availableCars",
        element: <AvailableCars/>,
      },
      {
        path: "/cars/:id",
        element: <CarDetails/>,
      },
      {
        path: "/pricing",
        element: <Pricing/>,
      },
      {
        path: "/pricing/:id",
        element: <PricingDetails/>,
      },
      {
        path: "/addCar",
        element: <PrivateRoutes><AddCar/></PrivateRoutes>,
      },
      {
        path: "/myCars",
        element: <PrivateRoutes><MyCars/></PrivateRoutes>,
      },
      {
        path: "/myBookings",
        element: <PrivateRoutes><MyBookings/></PrivateRoutes>,
      },
      {
        path: "/myProfile",
        element: <PrivateRoutes><MyProfile/></PrivateRoutes>,
      },
    ],
    errorElement: <ErrorPage/>
  },
]);
