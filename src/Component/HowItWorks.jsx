import React from 'react';
import { TruckIcon } from 'lucide-react'; // Optional: using lucide-react icons

const features = [
  { title: 'Booking Pick & Drop', description: 'From personal packages to business shipments — we deliver on time, every time.' },
  { title: 'Cash On Delivery', description: 'From personal packages to business shipments — we deliver on time, every time.' },
  { title: 'Delivery Hub', description: 'From personal packages to business shipments — we deliver on time, every time.' },
  { title: 'Booking SME & Corporate', description: 'From personal packages to business shipments — we deliver on time, every time.' },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-10 p-3 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">How it Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="text-teal-800 mb-4">
              <TruckIcon className="w-8 h-8" />
            </div>
            <h3 className="text-md font-bold text-[#03373D] mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
