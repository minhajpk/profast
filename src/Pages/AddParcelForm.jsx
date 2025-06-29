import React, { use } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
// import generateTrackingID from "@/utils/generateTrackingID";
import { AuthContext } from "../Context/AuthContext";

const AddParcelForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { user } = use(AuthContext);
//   const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  const parcelType = watch("type") || "document";
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const onSubmit = async (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = data.sender_center === data.receiver_center;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
      } else {
        const extraKg = weight - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = isSameDistrict ? 0 : 40;
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `
          Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
          Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
          ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
        `;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
        <div class="text-left text-base space-y-2">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Same District" : "Different District"}</p>
          <hr class="my-2"/>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
          <div class="text-gray-500 text-sm">${breakdown}</div>
          <hr class="my-2"/>
          <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
        </div>
      `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user.email,
          payment_status: 'unpaid',
          delivery_status: 'not_collected',
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };

        axiosSecure.post('/parcels', parcelData)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Redirecting...",
                text: "Proceeding to payment gateway.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              // TODO: Navigate to payment
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg px-4 sm:px-6 md:px-10 py-8 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add Parcel</h2>
      <hr className="mb-6 border-gray-300" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input type="radio" value="document" {...register("type")} defaultChecked />
            <span className={parcelType === "document" ? "text-green-600 font-medium" : "text-gray-600"}>Document</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="non-document" {...register("type")} />
            <span className={parcelType === "non-document" ? "text-green-600 font-medium" : "text-gray-600"}>Non-Document</span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <input type="text" {...register("parcel_name")} placeholder="Parcel Name" className="input input-bordered w-full" />
          <input type="number" step="any" {...register("weight")} placeholder="Parcel Weight (KG)" className="input input-bordered w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sender Section */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Sender Details</h4>
            <input type="text" {...register("sender_name")} placeholder="Sender Name" className="input input-bordered w-full mb-4" />
            <select {...register("sender_region")} className="select select-bordered w-full mb-4">
              <option value="">Select Region</option>
              {uniqueRegions.map((region, i) => <option key={i} value={region}>{region}</option>)}
            </select>
            <select {...register("sender_center")} className="select select-bordered w-full mb-4">
              <option value="">Select District</option>
              {getDistrictsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
            <input type="text" {...register("sender_contact")} placeholder="Sender Contact" className="input input-bordered w-full mb-4" />
            <textarea {...register("pickup_instruction")} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" />
          </div>

          {/* Receiver Section */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4">Receiver Details</h4>
            <input type="text" {...register("receiver_name")} placeholder="Receiver Name" className="input input-bordered w-full mb-4" />
            <select {...register("receiver_region")} className="select select-bordered w-full mb-4">
              <option value="">Select Region</option>
              {uniqueRegions.map((region, i) => <option key={i} value={region}>{region}</option>)}
            </select>
            <select {...register("receiver_center")} className="select select-bordered w-full mb-4">
              <option value="">Select District</option>
              {getDistrictsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
            <input type="text" {...register("receiver_contact")} placeholder="Receiver Contact" className="input input-bordered w-full mb-4" />
            <textarea {...register("delivery_instruction")} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" />
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 mb-4">* PickUp Time: 4pm-7pm Approx.</p>

        <button type="submit" className="bg-lime-400 hover:bg-lime-500 text-white font-semibold py-2 px-6 rounded w-full sm:w-auto">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcelForm;
