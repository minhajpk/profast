import React from 'react';

import img3 from "../assets/Benifits/safe-delivery.png";
import img2 from "../assets/Benifits/live-tracking.png";
import img1 from "../assets/Benifits/location-merchant.png";

const benefits = [
  {
    image: img1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    image: img2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: img3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#f1f4f6] py-10 px-4 max-w-7xl mx-auto">
        <div className=' border-t border-b border-gray-300 border-dashed '>
            <h2 className='text-center text-3xl font-bold mt-10 text-[#03464D]'>Why Choose Us</h2>
      <div className="space-y-8  mt-10 mb-10">
        {benefits.map((benefit, index) => (
          <div
            key={index} data-aos="fade-up-right"
            className="flex flex-col lg:flex-row items-center gap-6 p-6 lg:p-10 lg:h-60 bg-white rounded-xl shadow-sm"
          >
            <img src={benefit.image} alt={benefit.title} className="w-40 lg:w-48" />
            <div className="border-l-2 border-dashed border-gray-300 h-full mx-4 hidden lg:block" />
            <div>
              <h3 className="text-2xl font-bold text-[#03464D] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Benefits;
