import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = ({ userData, setuserData, step, setstep, setlogin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/family');
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!userData.email || !userData.password) {
            console.error('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token); 
                localStorage.setItem('role', 'patient'); 
                navigate('/home');
                toast.success("Login successful");
            } else {
                toast.error("Login unsuccessful");
                console.error('Login failed:', data.msg || 'An error occurred');
            }
            navigate('/family');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative flex justify-center items-center mt-20 min-h-[70vh] ">
            <div className='flex flex-col w-80 gap-5 p-6 border-none rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold text-center text-blue-500">Login</h2>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your email'
                        onChange={(e) =>
                            setuserData({ ...userData, email: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:ring-0 leading-tight focus:outline-none"
                    />
                </div>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaLock className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={(e) =>
                            setuserData({ ...userData, password: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:ring-0 leading-tight focus:outline-none"
                    />
                </div>

                <select
                    name="level"
                    value={userData.role}
                    placeholder="Your role"
                    onChange={(e) =>
                        setuserData({ ...userData, role: e.target.value })
                    }
                    required
                    className="mt-3 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    <option value="">Select role-</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                </select>
                <Link onChange={() => setlogin(1)} to={"/register-patient"}>
                    <div className='cursor-pointer text-gray-600 hover:text-blue-500'>Create an account?</div>
                </Link>
                <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login