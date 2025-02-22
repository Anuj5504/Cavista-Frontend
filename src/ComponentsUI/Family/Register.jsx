import React, { useState, useEffect } from 'react'
import { FaEnvelopeOpen, FaLock, FaUsers } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ initialUserData = {}, setuserData, step, setstep, setlogin }) => {
    const [userData, setUserData] = useState({
        familyName: '',
        houseid: '',
        familyPassword: '',
        name: '',
        email: '',
        password: '',
        role: '',
        ...initialUserData
    });
    const [familyCreated, setFamilyCreated] = useState(false);
    const [familyExists, setFamilyExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/family');
        }
    }, [navigate]);

    const handleCreateFamily = async () => {
        if (!userData.familyName || !userData.houseid || !userData.familyPassword) {
            console.error('All fields are required to create a family.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/family/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.familyName,
                    houseid: userData.houseid,
                    password: userData.familyPassword
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error:', errorText);
                return;
            }

            const data = await response.json();
            console.log('Family created successfully:', data);
            setUserData({ ...userData, familyid: data._id });
            setFamilyCreated(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleJoinFamily = async () => {
        if (!userData.houseid) {
            console.error('House ID is required to join a family.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/family/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ houseid: userData.houseid }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Joined family successfully:', data);
                setUserData({ ...userData, familyid: data.familyId });
                setFamilyExists(true);
            } else {
                console.error('Joining family failed:', data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSignIn = async () => {
        if (!familyCreated && !familyExists) {
            console.error('Please create or join a family first.');
            return;
        }

        if (!userData.name || !userData.email || !userData.password || !userData.familyid) {
            console.error('All fields are required for registration.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    family: userData.familyid,
                    role: userData.role || 'member'
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', 'patient');
                navigate('/home');
            } else {
                console.error('Registration failed:', data.msg || 'An error occurred');
            }
            navigate('/family');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="flex justify-center items-center mt-20 min-h-screen">
            <div className='flex flex-col w-80 gap-5 p-6 border-none rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold text-center text-blue-500">Register</h2>

                {!familyCreated && !familyExists && (
                    <>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <FaUsers className="text-blue-500 mr-3" />
                            <input
                                type="text"
                                placeholder='Enter Family Name'
                                value={userData.familyName}
                                onChange={(e) =>
                                    setUserData({ ...userData, familyName: e.target.value })
                                }
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <FaUsers className="text-blue-500 mr-3" />
                            <input
                                type="text"
                                placeholder='Enter House ID'
                                value={userData.houseid}
                                onChange={(e) =>
                                    setUserData({ ...userData, houseid: e.target.value })
                                }
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <FaLock className="text-blue-500 mr-3" />
                            <input
                                type="password"
                                placeholder='Enter Family Password'
                                value={userData.familyPassword}
                                onChange={(e) =>
                                    setUserData({ ...userData, familyPassword: e.target.value })
                                }
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={handleCreateFamily}
                            >
                                Create Family
                            </button>
                            <button
                                className="mt-5 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                onClick={handleJoinFamily}
                            >
                                Join Family
                            </button>
                        </div>
                    </>
                )}

                {(familyCreated || familyExists) && (
                    <>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <FaEnvelopeOpen className="text-blue-500 mr-3" />
                            <input
                                type="text"
                                placeholder='Enter your name'
                                value={userData.name}
                                onChange={(e) =>
                                    setUserData({ ...userData, name: e.target.value })
                                }
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <FaEnvelopeOpen className="text-blue-500 mr-3" />
                            <input
                                type="text"
                                placeholder='Enter your email'
                                value={userData.email}
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
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData({ ...userData, password: e.target.value })
                                }
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>

                        <select
                            name="level"
                            value={userData.role}
                            onChange={(e) =>
                                setUserData({ ...userData, role: e.target.value })
                            }
                            required
                            className="mt-3 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select role-</option>
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                        </select>

                        <Link onChange={() => setlogin(0)} to={"/login-patient"}>
                            <div className='cursor-pointer text-gray-600 hover:text-blue-500' >Already have an account?</div>
                        </Link>

                        <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleSignIn}>
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Register