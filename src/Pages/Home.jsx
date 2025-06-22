import React from 'react';
import Banner from '../Component/Banner';
import OurServices from '../Component/OurServices';
import ClientSlider from '../Component/ClientSlider';
import Benefits from '../Component/Benifits';
import BeMarchant from '../Component/BeMarchant';
import HowItWorks from '../Component/HowItWorks';
import FAQs from '../Component/FAQs';
import TestimonialsSlider from '../Component/TestimonialsSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientSlider></ClientSlider>
            <Benefits></Benefits>
            <BeMarchant></BeMarchant>
            <TestimonialsSlider></TestimonialsSlider>
            <FAQs></FAQs>
        </div>
    );
};

export default Home;