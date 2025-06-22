import React from 'react';

const FAQs = () => {
    return (
        <div className='max-w-7xl mx-auto mt-10 space-y-4 p-3' data-aos="zoom-in">
            <div className=' text-center space-y-4 lg:w-[65%] w-fit md:w-[70%] mx-auto mb-5'>
                <h1 className='lg:text-3xl text-2xl font-bold text-[#03373D]'>Frequently Asked Question (FAQ)</h1>
                <p className='text-gray-500'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-bold text-[#03373D]">What services does ProFast offer?</div>
                <div className="collapse-content text-sm text-gray-500">ProFast provides a wide range of delivery solutions including Same-Day Delivery, Pick & Drop, Cash on Delivery (COD), Business & Corporate Shipments, and Parcel Tracking — all designed to ensure reliable and timely service.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">How can I book a parcel with ProFast?</div>
                <div className="collapse-content text-sm text-gray-500">Booking with ProFast is simple. You can visit our website or mobile app, fill in the pickup and delivery details, and schedule a pickup. Our courier agent will arrive at your location to collect the parcel.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">Does ProFast offer Cash on Delivery (COD)?</div>
                <div className="collapse-content text-sm text-gray-500">Yes, ProFast offers COD services for e-commerce businesses and small vendors. We collect the payment from your customer at the time of delivery and transfer it securely to your account.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">How can I track my shipment?</div>
                <div className="collapse-content text-sm text-gray-500">Once your parcel is booked, you’ll receive a unique tracking ID via SMS or email. You can use this ID on our website or app to track your shipment in real-time.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">What areas does ProFast cover?</div>
                <div className="collapse-content text-sm text-gray-500">ProFast operates nationwide, covering major cities, towns, and rural areas. For specific delivery coverage or remote zone availability, please check the service map on our website or contact our support team.</div>
            </div>
        </div>
    );
};

export default FAQs;