
import React, { useState } from 'react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('Story');

  const tabs = ['Story', 'Mission', 'Success', 'Team & Others'];

  const tabContent = {
    Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,
    Mission: `Our mission is to simplify logistics through innovation, dedication, and care. We believe in empowering businesses and delighting end-users through seamless delivery.`,
    Success: `ProFast has built trust through transparency and reliability. Our growing base of satisfied clients proves our dedication to timely and secure delivery.`,
    'Team & Others': `Behind every delivery is a team of dedicated professionals. From riders to backend engineers, our people make ProFast reliable, scalable, and customer-first.`,
  };

  return (
    <section className="lg:p-20 px-4 py-10 my-10 rounded-2xl bg-white max-w-7xl mx-auto ">
      {/* Title Section */}
      <div className="mb-8 text-[#03373D] space-y-4">
        <h1 className="lg:text-3xl text-2xl font-extrabold">About Us</h1>
        <p className="text-gray-600 max-w-3xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
          packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <hr className="border-t border-dashed border-gray-300 mb-6" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 text-[#03373D] text-base sm:text-lg font-medium mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab
                ? 'font-extrabold'
                : 'hover:text-lime-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-gray-600 space-y-4 leading-relaxed">
        {[...Array(3)].map((_, i) => (
          <p key={i}>{tabContent[activeTab]}</p>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
