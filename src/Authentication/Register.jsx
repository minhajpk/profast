import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-500 mb-6 text-sm md:text-base">Register with Profast</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input {...register('name', { required: true })} type="text" className="input w-full" placeholder="Name" />
                    {errors.name && <p className='text-red-500'>Name is required.</p>}

                    <label className="label">Email</label>
                    <input {...register('email', { required: true })} type="email" className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>Email is required.</p>}

                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 8 })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === "required" && <p className='text-red-500'>Password is required.</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be at least 8 characters.</p>}

                    <button type="submit" className="btn mt-4 bg-[#CAEB66] hover:bg-lime-500 hover:text-white">Register</button>
                    <p>Do have any account? <Link to='/login'><span className='text-lime-600 font-bold'>Login</span></Link></p>
                    <div className="divider">OR</div>
                    <button className="btn bg-white text-[#03373D] border-[#CAEB66] hover:bg-lime-500 hover:text-white ">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff" />
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                            </g>
                        </svg>
                        Login with Google
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;
