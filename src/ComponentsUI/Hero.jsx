import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaTimes } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleGetStartedClick = () => {
        setShowOptions(true);
    };

    const handleRouteClick = (route) => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        } else {
            if (route === 'Patient Caretaker') {
                navigate('/login-patient');
            } else if (route === 'Health Provider') {
                navigate('/login-healthprovider');
            } else if (route === 'Care Coordinator') {
                navigate('/login-caregiver');
            }
        }
    };

    return (
        <div className='align-middle grid grid-cols-1 md:grid-cols-2 gap-10 h-screen w-screen my-10 p-5'>
            <div className='flex flex-col gap-5 mx-auto my-auto text-center md:text-left'>
                <div className='font-extrabold text-4xl md:text-6xl'>HealthSetu</div>
                <div className='font-mono text-sm md:text-base'>
                HealthSetu is India's trusted digital bridge connecting patients, doctors, and healthcare providers in a seamless and personalized way. Designed to enhance patient engagement, HealthSetu empowers users with easy access to medical consultations, health records, and wellness resources—all in one place. 
                </div>

                <div onClick={handleGetStartedClick} className='flex w-40 justify-center items-center bg-blue-500 rounded-lg py-2 cursor-pointer'>
                    <button onClick={handleGetStartedClick} className='bg-blue-500 hover:bg-blue-500'>
                        Get Started
                    </button>
                    <div><FaArrowRight className='' /></div>
                </div>
            </div>

            <div className='flex flex-col gap-5 mx-auto my-auto'>
                <img
                    src="https://cdn.prod.website-files.com/65f6ba266e0d7c8372e4b4cf/65fbb9b8ced567ebab4eab0a_banner.webp"
                    alt="Hero Image" className='w-full h-auto'
                />
            </div>

            {showOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg text-center w-96 h-72 flex flex-col justify-between relative">
                        <h3 className="text-2xl font-semibold mb-5">Login</h3>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => handleRouteClick('Patient Caretaker')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Patient Caretaker
                            </button>
                            <button
                                onClick={() => handleRouteClick('Health Provider')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Health Provider
                            </button>
                            <button
                                onClick={() => handleRouteClick('Care Coordinator')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Care Coordinator
                            </button>
                        </div>

                        <button
                            onClick={() => setShowOptions(false)}
                            className="absolute top-2 left-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Hero;
