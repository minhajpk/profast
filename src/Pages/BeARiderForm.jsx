import React from 'react';
import Agent from '../assets/agent-pending.png'


const BeARiderForm = () => {
  



  return (
    <section className="bg-white py-10 max-w-7xl rounded-2xl mx-auto mt-10 md:px-20">
  <div className='w-1/2 '>
  
    <h2 className="text-3xl font-bold text-[#03373D] mb-2">Be a Rider</h2>
  <p className="text-gray-500 mb-10">
    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
    packages to business shipments — we deliver on time, every time.
  </p>
  </div>
<div className='border-t border-dashed mb-5 border-gray-400'></div>
  <div data-aos="fade-right" className="grid md:grid-cols-2 gap-10 items-center">
    {/* Form */}
    <form className="space-y-6">
  <h3 className="text-2xl font-bold text-[#03373D]">Tell us about yourself</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
      <input id="name" name="name" type="text" placeholder="Your Name" className="input input-bordered w-full" />
    </div>

    <div>
      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Your Age</label>
      <input id="age" name="age" type="text" placeholder="Your Age" className="input input-bordered w-full" />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
      <input id="email" name="email" type="email" placeholder="Your Email" className="input input-bordered w-full" />
    </div>

    <div>
      <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
      <select id="region" name="region" className="input input-bordered w-full ">
        <option value="">Select your region</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Khulna">Khulna</option>
      </select>
    </div>

    <div>
      <label htmlFor="nid" className="block text-sm font-medium text-gray-700 mb-1">NID</label>
      <input id="nid" name="nid" type="text" placeholder="NID" className="input input-bordered w-full" />
    </div>

    <div>
      <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
      <input id="contact" name="contact" type="text" placeholder="Contact" className="input input-bordered w-full" />
    </div>

    <div className="sm:col-span-2">
      <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
      <select id="warehouse" name="warehouse" className="input input-bordered w-full">
        <option value="">Select warehouse</option>
        <option value="Uttara">Uttara</option>
        <option value="Mirpur">Mirpur</option>
        <option value="Motijheel">Motijheel</option>
      </select>
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
    <div  className="flex justify-center mt-3 w-full">
      <img
        src={Agent}
        alt="Delivery Rider"
        data-aos="fade-up-left"
        className="max-h-96  w-full object-contain"
      />
    </div>
  </div>
</section>

  );
};

export default BeARiderForm;
