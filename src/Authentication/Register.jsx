import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Icon from '../assets/user.png'
import Logo from '../Component/Logo';
import axios from 'axios';
import useAxios from '../Hooks/axiosInstance';


const Register = () => {
    const { signInWithGoogle, createUser, user, logOut, updateUserProfile } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile, setProfile] = useState();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const onSubmit = async (data) => {
        if (!profile) {
            Swal.fire({
                icon: 'warning',
                title: 'Please upload a profile image first.'
            });
            return;
        }

        try {
            const result = await createUser(data.email, data.password);
            console.log(result.user);

            const userInfo = {
                email: data.email,
                name: data.name,
                role: 'user',
                photoURL: profile,
                created_at: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users', userInfo);
            console.log(userRes.data);

            const userProfile = {
                displayName: data.name,
                photoURL: profile,
            };

            await updateUserProfile(userProfile);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully!",
                showConfirmButton: false,
                timer: 2000,
            });

            navigate('/');
        } catch (error) {
            console.error("User creation failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.message
            });
        }
    };

    const handleLogout = () => {
        logOut()
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in successfully with Google",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(imagUploadUrl, formData);

            const imageUrl = res.data.data.url;
            setProfile(imageUrl); 
            console.log("Image uploaded successfully:", imageUrl);
        } catch (error) {
            console.error("Image upload failed:", error.message);
            Swal.fire({
                icon: "error",
                title: "Image upload failed",
                text: error.message
            });
        }
    };




    return (
        <div data-aos="fade-up-right" className='max-w-7xl mx-auto'>
            <div className='mb-5 lg:-ml-30 -ml-4'>
                <Logo></Logo>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-500 mb-6 text-sm md:text-base">Register with Profast</p>
            </div>
            <div>
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="mb-2 btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || Icon} alt="User" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28"
                            >
                                <li>
                                    <button onClick={handleLogout} className="btn btn-sm w-full text-left">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="w-10 mb-2">
                            <img src={Icon} alt="Icon" />
                        </div>
                    )
                }

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input {...register('name')} type="text" className="input w-full" placeholder="Name" />
                    <label className="label">Email</label>
                    <input {...register('email')} type="email" className="input w-full" placeholder="Email" />
                    <div>
                        <label htmlFor="profileImage" className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full"

                        />
                        {errors.profileImage && (
                            <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
                        )}
                    </div>
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                        })}
                        className="input w-full"
                        placeholder="Password"
                    />
                    {errors.password?.type === ' required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters long.</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>}
                    <button className="btn  mt-4 bg-[#CAEB66] text-[#03373D] hover:scale-105 transition duration-300 hover:bg-[#CAEB66] hover:text-[#03373D]">Register</button>
                    <p>Don’t have any account? <Link to='/login'><span className='text-lime-600 font-bold'>Login</span></Link></p>
                    {/* <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-[#03373D] border-[#CAEB66] hover:scale-105 transition duration-300 hover:bg-[#CAEB66] hover:text-Black ">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button> */}
                </fieldset>
            </form>
        </div>
    );
};

export default Register;
