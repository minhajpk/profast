import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axiosSecure from '../../Hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecures = axiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecures.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });
        if (confirm.isConfirmed) {
            try {
                
                axiosSecures.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })

                
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };
    const handlepay = (id) =>{
        console.log(id)
        navigate(`/dashboard/payment/${id}`)
    }

  return (
    <div className="overflow-x-auto mt-6 p-6">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <table className="table table-zebra w-full text-sm rounded-2xl ">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Type</th>
            <th>Created At</th>
            <th> $ Cost </th>
            <th>Payment Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.parcel_name}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>$ {parcel.cost}</td>
              <td className={parcel.payment_status === 'paid' ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                {parcel.payment_status}
              </td>
              <td className="flex flex-wrap justify-center gap-2">
                <button className="btn btn-sm btn-info text-white">View</button>
                {parcel.payment_status !== 'paid' && (
                  <button onClick={() => handlepay(parcel._id)} className="btn btn-sm btn-success text-white">Pay</button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
