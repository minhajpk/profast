import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const statusIcons = {
  totalParcels: <FaBoxOpen className="text-4xl text-indigo-500" />,
  totalPayment: <FaMoneyBillWave className="text-4xl text-green-500" />,
};

const statusLabels = {
  totalParcels: "Total Parcels",
  totalPayment: "Total Payment (৳)",
};

export default function UserDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/dashboard");
      return res.data; // expect { totalParcels, totalPayment }
    },
    staleTime: 5 * 60 * 1000,
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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
          >
            {statusIcons[key] || <FaBoxOpen className="text-4xl" />}
            <h2 className="text-lg font-semibold mt-3 text-center">
              {statusLabels[key] || key}
            </h2>
            <p className="text-4xl font-extrabold text-primary mt-2">
              {key === "totalPayment" ? `৳ ${value}` : value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
