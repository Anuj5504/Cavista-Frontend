import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is HealthSetu and how does it work?",
            answer: "HealthSetu is India's leading digital healthcare platform that connects patients with healthcare providers. Our platform streamlines the healthcare journey by providing easy access to medical consultations, health records, and wellness resources."
        },
        {
            question: "How do I schedule an appointment with a healthcare provider?",
            answer: "Simply log in to your HealthSetu account, browse through our verified healthcare providers, select your preferred doctor, and choose an available time slot. You can schedule both in-person and virtual consultations through our platform."
        },
        {
            question: "Is my health data secure on HealthSetu?",
            answer: "Yes, absolutely. We implement enterprise-grade security measures and follow all healthcare data protection regulations. Your health information is encrypted and stored securely, accessible only to authorized healthcare providers and yourself."
        },
        {
            question: "What types of healthcare services are available?",
            answer: "HealthSetu offers a comprehensive range of services including primary care, specialist consultations, mental health support, preventive healthcare, and chronic disease management. Our network includes verified doctors, specialists, and healthcare facilities across India."
        },
        {
            question: "How can healthcare providers join HealthSetu?",
            answer: "Healthcare providers can join our network by completing our verification process. This includes submitting necessary credentials, licenses, and completing our onboarding process. Contact our provider support team for more information."
        }
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions about HealthSetu's services and platform
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-md"
                    >
                        <button
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="font-semibold text-lg text-gray-900 flex-1 pr-4">
                                {faq.question}
                            </span>
                            <span className={`text-blue-600 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''
                                }`}>
                                {openIndex === index ? (
                                    <FaMinus className="w-5 h-5" />
                                ) : (
                                    <FaPlus className="w-5 h-5" />
                                )}
                            </span>
                        </button>

                        <div className={`transition-all duration-300 ${openIndex === index
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}>
                            <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                    Still have questions? We're here to help!
                </p>
                <p>Connect with us healthsetu25@gmail.com</p>
            </div>
        </div>
    );
};

export default FAQSection;
