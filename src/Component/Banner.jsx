import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImage1 from '../assets/banner/banner1.png'
import BannerImage2 from '../assets/banner/banner2.png'
import BannerImage3 from '../assets/banner/banner3.png'



const Banner = () => {
    return (
        <div className='lg:ml-20 lg:mr-20 lg:mt-10'>
            <Carousel autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={3000}
                stopOnHover={false}
                showArrows={true}>
                  
                <div>
                    <img src={BannerImage1} />

                </div>
                <div>
                    <img src={BannerImage2} />

                </div>
                <div>
                    <img src={BannerImage3} />

                </div>
            </Carousel>
        </div>
    );
};

export default Banner;