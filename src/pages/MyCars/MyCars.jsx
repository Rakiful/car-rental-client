import React, { Suspense, useContext } from "react";
import { CarsList } from "./CarsList";
import { useMyCarsApi } from "../../api/useMyCarsApi";
import { AuthContext } from "../../contexts/AuthContext";

export const MyCars = () => {
  const { user } = useContext(AuthContext);
  const { myCarsPromise } = useMyCarsApi();
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-8">
        My Cars
      </h2>
      <Suspense
        fallback={
          <div className="flex justify-center h-screen">
            <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
          </div>
        }
      >
        <CarsList myCarsPromise={myCarsPromise(user.email, user.accessToken)} />
      </Suspense>
    </div>
  );
};
