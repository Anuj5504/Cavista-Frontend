import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CareLogin = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token");
        if (token) {
            navigate('/caregiver');
            console.log("yes");
        } else navigate('/login-caregiver');
    }, [navigate]);

    const handleLogin = async () => {
        if (!userData.email || !userData.password) {
            console.error('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/caregiver/login', {
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
                localStorage.setItem('role', 'caregiver');
                toast.success("Login successful");
                navigate('/caregiver')
            } else {
                toast.error("Login unsuccessful");
                console.error('Login failed:', data.msg || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-20 min-h-[70vh]">
            <div className='flex flex-col w-80 gap-5 p-6 border-none rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold text-center text-blue-500">Caretaker Login</h2>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your email'
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        className="appearance-none focus:ring-0 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaLock className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        className="appearance-none focus:ring-0 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>

                <Link to={"/register-caregiver"}>
                    <div className='cursor-pointer text-gray-600 hover:text-blue-500'>Create an account?</div>
                </Link>
                <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default CareLogin;
