import React, { Suspense, useContext ,useState , useEffect} from "react";
import { useMyBookingsApi } from "../../api/useMyBookingsApi";
import { AuthContext } from "../../contexts/AuthContext";
import { BookingsList } from "./BookingsList";
import { BookingStatsBarChart } from "./BookingStatsBarChart";


export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const { myBookingsPromise } = useMyBookingsApi();

  useEffect(() => {
    myBookingsPromise(user.email, user.accessToken).then(setBookings);
  }, [user]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-8">
        My Bookings
      </h2>
      {
        bookings.length > 0 && <BookingStatsBarChart bookings={bookings} />
      }
      <Suspense
        fallback={
          <div className="flex justify-center h-screen">
            <span className="loading loading-spinner lg:p-10 loading-xl text-orange-500"></span>
          </div>
        }
      >
        <BookingsList myBookingsPromise={myBookingsPromise(user.email, user.accessToken)} />
      </Suspense>
    </div>
  );
};
