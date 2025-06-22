import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import image from '../assets/customer-top.png'
import image2 from '../assets/reviewQuote.png'

const testimonials = [
    {
        name: "Nasir Uddin",
        title: "CEO",
        text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Sharmin Akter",
        title: "Marketing Manager",
        text: "Using a posture corrector daily helped me reduce my back pain and stay confident during long meetings and presentations.",
    },
    {
        name: "Tanvir Ahmed",
        title: "Software Engineer",
        text: "I spend hours at a desk, and this posture corrector reminded me to sit upright, which reduced my tension headaches significantly.",
    },
    {
        name: "Afsana Rahman",
        title: "HR Executive",
        text: "It's a simple tool that made a big difference. My colleagues even noticed I stand straighter now!",
    },
    {
        name: "Rashidul Karim",
        title: "Entrepreneur",
        text: "When you're always on the move, good posture is vital. This device helped me stay aligned and comfortable throughout the day.",
    },
    {
        name: "Farhana Jahan",
        title: "Fitness Coach",
        text: "As a fitness coach, I recommend posture correctors to my clients who struggle with rounded shoulders from office work.",
    },
    {
        name: "Md. Sazzad Hossain",
        title: "Sales Executive",
        text: "I travel often for work, and the posture corrector fits easily in my bag. It's lightweight but very effective.",
    },
    {
        name: "Nusrat Jahan",
        title: "Content Writer",
        text: "Writing for long hours used to strain my neck. With this corrector, I feel less fatigued at the end of the day.",
    },
    {
        name: "Zahid Hasan",
        title: "Graphic Designer",
        text: "I used to slouch a lot while designing. The posture corrector helps me sit straight and stay more focused.",
    },
    {
        name: "Shamima Sultana",
        title: "Physiotherapist",
        text: "This tool is great as a daily reminder to maintain posture. It's not a replacement for exercise, but it complements it perfectly.",
    }
];

const TestimonialsSlider = () => {
    return (
        <section className="bg-gray-100 max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-10">
                <img
                    src={image}
                    alt="Courier"
                    className="mx-auto  mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-800">
                    What our customers are sayings
                </h2>
                <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with ProFast Courier.
                </p>
            </div>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination]} // ✅ include Autoplay here
                className="w-full max-w-4xl mx-auto"
            >
                {/* Slides go here */}
          


            {testimonials.map((item, index) => (
                <SwiperSlide
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg max-w-sm"
                >
                    <div className="text-teal-600 text-3xl mb-4"><img src={image2} alt="quota" /></div>
                    <p className="text-gray-700 text-sm mb-6">{item.text}</p>
                    <hr className="border-dashed border-t-2 border-gray-300 mb-4" />
                    <div>
                        <div className="text-base font-semibold text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </section >
    );
};

export default TestimonialsSlider;
