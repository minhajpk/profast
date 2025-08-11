import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Logo from '../Component/Logo';

const Login = () => {
    const { signInWithGoogle, logIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = data => {
        logIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Account Login Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location.state?.from || '/', { replace: true });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Account Login Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location.state?.from || '/', { replace: true });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div data-aos="fade-up-right" className='max-w-7xl mx-auto'>
            <div className='mb-5 lg:-ml-30 -ml-4'>
                <Logo />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#03373D] mb-1">Welcome Back</h2>
                    <p className="text-gray-500 mb-6 text-sm md:text-base">Login with Profast</p>
                </div>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input {...register('email')} type="email" className="input w-full" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input w-full" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn mt-4 bg-[#CAEB66] text-[#03373D] hover:scale-105 transition duration-300 hover:bg-[#CAEB66] hover:text-[#03373D]">Login</button>
                    <p>Don’t have any account? <Link to='/register'><span className='text-lime-600 font-bold'>Register</span></Link></p>
                    <div className="divider">OR</div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn bg-white text-[#03373D] border-[#CAEB66] hover:scale-105 transition duration-300 hover:bg-[#CAEB66] hover:text-Black "
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;
