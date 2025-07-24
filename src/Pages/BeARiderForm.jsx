import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import Agent from '../assets/agent-pending.png';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../Hooks/axiosSecure';
const BeARiderForm = () => {
  const { user } = use(AuthContext);
  const axiosSecures = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");

  const regions = [...new Set(serviceCenters.map((s) => s.region))];
  const districts = serviceCenters
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

  const onSubmit = async (data) => {
  const riderData = {
    name: data.name || user?.displayName || '',
    age: data.age,
    email: data.email || user?.email || '',
    nid: data.nid,
    contact: data.contact,
    region: data.region,
    district: data.district,
    warehouse: data.warehouse,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  console.log("Submitting rider data:", riderData);

  try {
    const res = await axiosSecures.post('/riders', riderData);
    console.log(res);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your application is pending approval.",
      });
      setSelectedRegion("");
      reset(); 
    }
  } catch (error) {
    console.error("Submission failed", error);
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "Please try again later.",
    });
  }
};




  return (
    <section className="bg-white py-10 max-w-7xl rounded-2xl mx-auto mt-10 md:px-20">
      <div className="w-1/2">
        <h2 className="text-3xl font-bold text-[#03373D] mb-2">Be a Rider</h2>
        <p className="text-gray-500 mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
          packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="border-t border-dashed mb-5 border-gray-400"></div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Form */}
        <form data-aos="fade-up-right" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-2xl font-bold text-[#03373D]">Tell us about yourself</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
               value={user?.displayName || ''}
            readOnly
               {...register("name", { required: true })} 
               placeholder='Enter Your Name' 
               className="input input-bordered w-full" />
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Age</label>
              <input {...register("age", { required: true })} placeholder='Enter Your Age' className="input input-bordered w-full" />
              {errors.age && <p className="text-red-500 text-sm mt-1">Age is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
               value={user?.email || ''}
            readOnly
                {...register("email", { required: true })}
                type="email"
                className="input input-bordered w-full"
                placeholder='Enter Your Email'
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm">District is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NID</label>
              <input {...register("nid", { required: true })} placeholder='NID' className="input input-bordered w-full" />
              {errors.nid && <p className="text-red-500 text-sm mt-1">NID is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input {...register("contact", { required: true })} placeholder='Contact' className="input input-bordered w-full" />
              {errors.contact && <p className="text-red-500 text-sm mt-1">Contact is required</p>}
            </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">warehouses</label>
              <select
                {...register("warehouse", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select warehouse</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm">District is required</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#CAEB66] text-gray-800 hover:bg-lime-500 hover:text-white font-semibold py-2 rounded-md"
          >
            Submit
          </button>
        </form>

        {/* Image */}
        <div className="flex justify-center mt-3 w-full">
          <img
            src={Agent}
            alt="Delivery Rider"
            data-aos="fade-up-left"
            className="max-h-96 w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default BeARiderForm;
