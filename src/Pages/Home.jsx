import React from 'react';
import Banner from '../Component/Banner';
import OurServices from '../Component/OurServices';
import ClientSlider from '../Component/ClientSlider';
import Benefits from '../Component/Benifits';
import BeMarchant from '../Component/BeMarchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <ClientSlider></ClientSlider>
            <Benefits></Benefits>
            <BeMarchant></BeMarchant>
        </div>
    );
};

export default Home;