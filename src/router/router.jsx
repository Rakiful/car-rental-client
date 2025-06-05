import React from "react";
import { createBrowserRouter } from "react-router";
import { RootLayouts } from "../layouts/RootLayouts";
import { Home } from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
