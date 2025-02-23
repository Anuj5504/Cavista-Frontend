import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CareRegister = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/caregiver');
        }
    }, [navigate]);

    const handleRegister = async () => {
        if (!userData.name || !userData.email || !userData.password) {
            console.error('All fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/caregiver/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', 'caregiver');
                toast.success("Register successful");
                navigate('/caregiver');
            } else {
                toast.error("Register unsuccessful");
                console.error('Registration failed:', data.msg || 'An error occurred');
            }
            navigate('/caregiver')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-20 min-h-[80vh]">
            <div className='flex flex-col w-80 gap-5 p-6 border-none rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold text-center text-blue-500">Caretaker Register</h2>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaUser className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your name'
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your email'
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>

                <Link to={"/login-caregiver"}>
                    <div className='cursor-pointer text-gray-600 hover:text-blue-500'>Already have an account?</div>
                </Link>
                <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default CareRegister;
