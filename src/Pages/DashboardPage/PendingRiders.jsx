import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/axiosSecure';

const PendingRiders = () => {
  const axiosSecures = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // GET all riders
  const { data: allRiders = [], isLoading } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecures.get('/riders');
      return res.data;
    },
  });

  // Filter riders to show only those with status "pending"
  const riders = allRiders.filter(rider => rider.status?.toLowerCase() === 'pending');

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecures.delete(`/riders/${id}`);
      return res.data;
    },
    onSuccess: (_data, id) => {
      Swal.fire('Deleted!', 'Rider has been deleted.', 'success');

      // Remove rider from cache immediately
      queryClient.setQueryData(['riders'], (old = []) =>
        old.filter(rider => rider._id !== id)
      );

      queryClient.invalidateQueries(['riders']);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete the rider.', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, role }) => {
      await axiosSecures.patch(`/riders/${id}`, { status, role });
      return { id, status, role };
    },
    onSuccess: ({ id }) => {
      // Remove updated rider from cache immediately
      queryClient.setQueryData(['riders'], (old = []) =>
        old.filter(rider => rider._id !== id)
      );

      // Optional: refetch to sync
      queryClient.invalidateQueries(['riders']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong', 'error');
    },
  });

  const handleUpdate = (rider, newStatus, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to set this rider to ${newStatus}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id: rider._id, status: newStatus, role: newRole });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Manage Riders</h2>
      <div className="overflow-x-auto max-w-full">
        <table className="table w-full max-w-7xl">
          <thead className="bg-[#CAEB66] text-[#03373D]">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No pending riders found.
                </td>
              </tr>
            )}
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.contact}</td>
                <td>{rider.warehouse}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      rider.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : rider.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td className="space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdate(rider, 'approved', 'rider')}
                    className="btn bg-[#009E60] hover:bg-green-800 text-white font-bold btn-sm mr-2"
                    disabled={rider.status?.toLowerCase() !== 'pending'}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleUpdate(rider, 'rejected', 'user')}
                    className="btn bg-red-600 hover:bg-red-700 text-white font-bold btn-sm"
                    disabled={rider.status?.toLowerCase() !== 'pending'}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn btn-sm bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-info btn-sm text-white"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog id="riderDetailsModal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-2">Rider Details</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.contact}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Warehouse:</strong> {selectedRider.warehouse}</p>
              <p><strong>Applied At:</strong> {selectedRider.createdAt}</p>
              {selectedRider.note && <p><strong>Note:</strong> {selectedRider.note}</p>}
            </div>

            <div className="modal-action mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedRider(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
