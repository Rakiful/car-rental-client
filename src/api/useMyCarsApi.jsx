import React from "react";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

export const useMyCarsApi = () => {
  const axiosSecure = useAxiosSecure();

  const myCarsPromise = (email) => {
    return axiosSecure.get(`/cars?email=${email}`).then(res=>res.data);
  };
  return {
    myCarsPromise
  };
};
