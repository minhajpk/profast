import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-500 mb-6 text-sm md:text-base">Login with Profast</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input {...register('email')} type="email" className="input w-full" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input w-full" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn  mt-4 bg-[#CAEB66] hover:bg-lime-500 hover:text-white">Login</button>
                    <p>Don’t have any account? <Link to='/register'><span className='text-lime-600 font-bold'>Register</span></Link></p>
                    <div className="divider">OR</div>
                    <button className="btn bg-white text-[#03373D] border-[#CAEB66] hover:bg-lime-500 hover:text-white ">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;