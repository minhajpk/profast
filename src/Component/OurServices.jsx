import React from 'react';

// src/pages/Home/OurServices.jsx
import { FaTruck, FaGlobeAsia, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndo } from 'react-icons/fa';

const services = [
  {
    icon: <FaTruck className="text-4xl text-primary" />,
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    icon: <FaGlobeAsia className="text-4xl text-primary" />,
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    icon: <FaWarehouse className="text-4xl text-primary" />,
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    icon: <FaBuilding className="text-4xl text-primary" />,
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support."
  },
  {
    icon: <FaUndo className="text-4xl text-primary" />,
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
  }
];

const OurServices = () => {
  return (
    <section className="lg:ml-20 lg:mr-20 p-3 mt-16 rounded-xl bg-[#03373D]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white pt-10">Our Services</h2>
        <p className="mt-4 text-white max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:pl-30 lg:pr-30 pb-20 ">
        {services.map((service, index) => (
          <div key={index} className="card bg-base-200 p-6 shadow-md hover:bg-[#CAEB66] hover:shadow-lg transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className='w-18 h-18 rounded-full  flex justify-center items-center bg-radial-[at_55%_55%] from-white to-blue-100 to-75%'>{service.icon}</div>
              <h3 className="card-title text-[#03373D] text-lg mt-4">{service.title}</h3>
              <p className="text-sm text-gray-600 ">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
