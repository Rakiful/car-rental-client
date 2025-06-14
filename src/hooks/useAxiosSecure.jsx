import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const useAxiosSecure = () => {
  const { user, signOutUser, setLoading } = useContext(AuthContext);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error in interceptor", error);
      if (error.status === 401 || error.status === 403) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: `sign out the user for ${error.status} status code`,
              icon: "error",
              draggable: true,
              showConfirmButton: true,
              //   timer: 2000,
            });
            console.log(`sign out the user for ${error.status} status code`);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
