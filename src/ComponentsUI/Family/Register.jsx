import React, { useState } from 'react'
import { FaEnvelopeOpen, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Register = (userData,setuserData,step,setstep,setlogin) => {

    const handleSignIn=()=>{
        console.log(userData,step);
        setstep(step+1);
    }
   
    return (
        <div className="flex justify-center items-center mt-20 ">
            <div className='flex flex-col w-80 gap-5 p-6 border-none rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold text-center text-blue-500">Register</h2>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaEnvelopeOpen className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your name'
                        onChange={(e) =>
                            setuserData({ ...userData, name: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaEnvelopeOpen className="text-blue-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Enter your email'
                        onChange={(e) =>
                            setuserData({ ...userData, email: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>

                <div className="flex items-center border-b border-blue-500 py-2">
                    <FaLock  className="text-blue-500 mr-3" />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={(e) =>
                            setuserData({ ...userData, password: e.target.value })
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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

                <Link onChange={()=>setlogin(0)} to={"/login-patient"}>
                <div  className='cursor-pointer text-gray-600 hover:text-blue-500' >Already have an account?</div>
                </Link>

                <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleSignIn}>
                    Sign up
                </button>   
            </div>
        </div>
    )
}

export default Register