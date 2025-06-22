import React from 'react';
import image from '../assets/Layer_1.png'
import image2 from '../assets/be-a-merchant-bg.png'

const BeMarchant = () => {
    return (
        <div className="max-w-7xl mx-auto">
  <div data-aos="zoom-in-up" className=" bg-no-repeat bg-[#03373D]  p-6 md:p-12 lg:p-20 rounded-2xl text-white"
  style={{ backgroundImage: `url(${image2})` }}>

    <div className="hero-content flex-col-reverse lg:flex-row-reverse items-center gap-8">
      <img
        src={image}
        alt="Courier"
        className="w-full max-w-xs md:max-w-sm rounded-lg"
      />

    
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Merchant and Customer Satisfaction is Our First Priority
        </h1>
        <p className="py-4 text-sm md:text-base text-[#DADADA]">
          We offer the lowest delivery charge with the highest value along with 100% safety of your product. Profast Courier delivers your parcels in every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="btn rounded-4xl bg-[#CAEB66] w-full sm:w-auto">Be a Merchant</button>
          <button className="btn rounded-4xl border-1 text-[#CAEB66] bg-[#03373D] border-[#CAEB66] w-full sm:w-auto">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default BeMarchant;