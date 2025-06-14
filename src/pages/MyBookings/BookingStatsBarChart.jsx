import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

export const BookingStatsBarChart = ({ bookings }) => {
  const data = bookings.map((booking) => ({
    car_model: booking.car_model,
    totalCost: booking.totalCost,
    status: booking.status,
  }));

  return (
    <div className="my-10">
      <h3 className="text-2xl font-semibold text-center mb-4">
        Total Cost per Booking
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="car_model" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCost" name="Total Cost">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.status === "Confirmed" ? "#34D399" : "#F87171"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
