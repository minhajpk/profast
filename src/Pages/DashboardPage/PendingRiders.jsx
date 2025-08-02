import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/axiosSecure";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecures = useAxiosSecure();

  const { isPending, data: allRiders = [], refetch } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecures.get("/riders");
      return res.data;
    }
  });

  // Filter only pending riders
  const pendingRiders = allRiders.filter(
    (rider) => rider.status?.toLowerCase() === "pending"
  );

  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const status = action === "approve" ? "active" : "rejected";
      await axiosSecures.patch(`/riders/${id}/status`, { status, email });

      refetch(); // Update the table

      Swal.fire("Success", `Rider ${action}d successfully`, "success");
    } catch (err) {
      Swal.fire("Error", "Could not update rider status", "error");
    }
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Rider Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra max-w-7xl">
          <thead className="bg-[#CAEB66] text-[#03373D]">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.contact}</td>
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDecision(rider._id, "approve", rider.email)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(rider._id, "reject", rider.email)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {pendingRiders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No pending rider applications.
                </td>
              </tr>
            )}
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
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bike_brand}</p>
              <p><strong>Bike Registration:</strong> {selectedRider.bike_registration}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Applied At:</strong> {new Date(selectedRider.createdAt).toLocaleString()}</p>
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
