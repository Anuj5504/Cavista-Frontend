import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
    const[openIndex,setOpenIndex]=useState(null);

    const faqs = [
        {
            question: "How can home healthcare providers improve patient engagement?",
            answer: "By tailoring care plans, and involving patients in decision-making."
        },
        {
            question: "What role does technology play in patient engagement in home healthcare?",
            answer: "Technology enables remote monitoring and personalized health education."
        },
        {
            question: "Why is patient engagement important in home healthcare?",
            answer: "It leads to better health outcomes, increased patient satisfaction, and reduced hospital readmissions."
        },
        {
            question: "How can patients be encouraged to adhere to their care plans at home?",
            answer: "Through regular follow-ups, medication reminders, and providing clear, accessible health information."
        }
    ];

    // Toggle function for opening/closing the FAQ answers
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Close the answer if it’s already open, otherwise open it
    };

    return (
        <div className=" faq-section w-[60%] mb-5 p-5 md:mx-20 bg-gray-100 rounded-md ">
            <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            
            <div>
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item mb-4">
                        <div
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="font-medium text-lg">{faq.question}</span>
                            <span>
                                {openIndex === index ? (
                                    <FaMinus size={20} />
                                ) : (
                                    <FaPlus size={20} />
                                )}
                            </span>
                        </div>

                        {/* The answer will be shown or hidden based on the `openIndex` state */}
                        {openIndex === index && (
                            <div className="p-4 mt-2 bg-gray-50 rounded-md">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
