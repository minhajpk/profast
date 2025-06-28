import React from 'react';
import ManinLogo from '../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
           <Link to='/'><div className='flex items-end'>
                        <img className='mb-2' src={ManinLogo} alt="" />
                        <p className='text-2xl -ml-2 font-extrabold'>ProFast</p>
                    </div></Link> 
        </div>
    );
};

export default Logo;