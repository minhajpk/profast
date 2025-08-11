import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClock, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const statusIcons = {
  pending: <FaClock className="text-4xl text-yellow-400" />,
  completed: <FaCheckCircle className="text-4xl text-green-400" />,
  earnings: <FaDollarSign className="text-4xl text-blue-400" />,
};

const statusLabels = {
  pending: "Pending Deliveries",
  completed: "Completed Deliveries",
  earnings: "Total Earnings (৳)",
};

export default function RiderDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["riderDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/dashboard");
      return res.data; // expect { pending, completed, earnings }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading data: {error.message}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl ">
      <h1 className="text-3xl font-bold mb-6">Rider Dashboard Summary</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
          >
            {statusIcons[key] || <FaClock className="text-4xl" />}
            <h2 className="text-lg font-semibold mt-3 text-center">
              {statusLabels[key] || key}
            </h2>
            <p className="text-4xl font-extrabold text-primary mt-2">
              {key === "earnings" ? `৳ ${value}` : value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
