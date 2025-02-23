import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaTimes, FaCheckCircle } from "react-icons/fa";
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
        <div className='min-h-screen bg-gradient-to-br from-white to-blue-50'>
            
            <div className='container mx-auto px-4 pt-10 pb-12'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                    
                    <div className='flex flex-col gap-8 md:w-1/2'>

                        <h1 className='font-extrabold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800'>
                          Bringing Personalization to Patient Care.
                        </h1>

                        <p className='text-gray-600 text-lg md:text-xl leading-relaxed'>
                            HealthSetu bridges the gap between patients and healthcare providers, making quality healthcare accessible to all Indians through our innovative digital platform.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                            <button
                                onClick={handleGetStartedClick}
                                className='flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg py-3 px-8 hover:bg-blue-700 transition duration-300 shadow-lg'
                            >
                                Get Started
                                <FaArrowRight className='ml-2' />
                            </button>
                            <button className='flex items-center justify-center border-2 border-blue-600 text-blue-600 font-semibold rounded-lg py-3 px-8 hover:bg-blue-50 transition duration-300'>
                                Learn More
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-4 mt-2'>
                            {['24/7 Support', 'Secure Platform', 'Easy Access', 'Pan India Network'].map((feature) => (
                                <div key={feature} className='flex items-center gap-2 text-gray-700'>
                                    <FaCheckCircle className='text-blue-600' />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='md:w-1/2'>
                        <div className='relative'>
                            <div className='absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur-lg opacity-30'></div>
                            <img
                                src="https://cdn.prod.website-files.com/65f6ba266e0d7c8372e4b4cf/65fbb9b8ced567ebab4eab0a_banner.webp"
                                alt="HealthSetu Platform"
                                className='relative rounded-lg shadow-2xl w-full object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl text-center w-96 flex flex-col gap-6 relative shadow-2xl">
                        <h3 className="text-2xl font-bold text-gray-800">Choose Your Role</h3>
                        <p className="text-gray-600">Select how you want to access HealthSetu</p>

                        <div className="flex flex-col gap-4">
                            {[
                                { title: 'Patient', route: 'Patient Caretaker' },
                                { title: 'Healthcare Provider', route: 'Health Provider' },
                                { title: 'Care Givers', route: 'Care Coordinator' }
                            ].map((option) => (
                                <button
                                    key={option.title}
                                    onClick={() => handleRouteClick(option.route)}
                                    className="px-6 py-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-300 flex items-center justify-center gap-2 font-semibold"
                                >
                                    {option.title}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowOptions(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition duration-200"
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
