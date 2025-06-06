import React from "react";
import { createBrowserRouter } from "react-router";
import { RootLayouts } from "../layouts/RootLayouts";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
import { Register } from "../pages/Register/Register";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import { AvailableCars } from "../pages/AvailableCars/AvailableCars";

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
        path: "/addCar",
        element: <PrivateRoutes>AddCar</PrivateRoutes>,
      },
      {
        path: "/myCars",
        element: <PrivateRoutes>myCars</PrivateRoutes>,
      },
      {
        path: "/myBookings",
        element: <PrivateRoutes>myBookings</PrivateRoutes>,
      },
    ],
  },
]);
