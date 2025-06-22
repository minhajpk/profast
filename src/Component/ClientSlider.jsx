import React from 'react';

// Import your logos
import logo1 from "../assets/brands/amazon.png";
import logo2 from "../assets/brands/amazon_vector.png";
import logo3 from "../assets/brands/casio.png";
import logo4 from "../assets/brands/moonstar.png";
import logo5 from "../assets/brands/randstad.png";
import logo6 from "../assets/brands/start-people 1.png";
import logo7 from "../assets/brands/start.png";
import Marquee from 'react-fast-marquee';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
  return (
   <div className=" py-10 max-w-7xl mx-auto p-3 rounded-2xl mt-10 ">
    <h3 className='text-center text-2xl font-extrabold pt-10 pb-10 text-[#03373D]'>We've helped thousands of sales teams</h3>
      <Marquee gradient={false} speed={40}>
        <div className="flex gap-20 items-center ">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client ${index}`}
              className="h-6 w-auto"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ClientSlider;
