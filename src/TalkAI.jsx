import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import Test from './ComponentsUI/Test';

let recognition;

const TalkAI = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [report, setReport] = useState(null);
    const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const patientId = decode.user._id;
    const [appointmentId, setAppointmentId] = useState(null);
    console.log(patientId);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';



        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            handleSendMessage(text);
        };

        startConversation();
    }, []);

    const startConversation = async () => {
        try {
            console.log("Starting conversation..."); // Debug log
            const response = await fetch("http://localhost:3000/api/appointments/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ sessionId}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response received:", data); // Debug log
            speakResponse(data.reply);
        } catch (error) {
            console.error("Error starting conversation:", error);
            // Show error to user
            alert("Failed to connect to the server. Please try again later.");
        }
    };

    const handleSendMessage = async (text) => {
        try {
            const response = await fetch("http://localhost:3000/api/appointments/talk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    sessionId,
                    text,
                    patientId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data.report) {
                console.log("Report received:", data.report);
                console.log("Appointment ID:", data.appointmentId);
                setReport(data.report);
                setAppointmentId(data.appointmentId);
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                speakResponse(data.reply);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    const speakResponse = (text) => {
        if (!text) return;

        window.speechSynthesis.cancel();
        setIsSpeaking(true);

        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = 'en-US';
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => {
            setIsSpeaking(false);
            if (!report) {
                setTimeout(() => recognition.start(), 500);
            }
        };

        window.speechSynthesis.speak(speech);
    };

    const handleMicClick = () => {
        if (isListening || isSpeaking) {
            if (isListening) recognition.stop();
            if (isSpeaking) window.speechSynthesis.cancel();
            setIsListening(false);
            setIsSpeaking(false);
        } else {
            recognition.start();
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white py-4 px-6 shadow-sm">
                <h1 className="text-xl text-center text-gray-800 font-medium">
                    Cavista Health Assistant
                </h1>
            </header>

            <main className="flex-1 flex items-center justify-center p-6">
                {!report ? (
                    <div className="text-center">
                        <button
                            onClick={handleMicClick}
                            className={`
                                w-24 h-24 rounded-full shadow-lg
                                flex items-center justify-center text-3xl
                                transition-all duration-200 hover:shadow-xl
                                ${isListening ? 'bg-red-500 text-white' :
                                    isSpeaking ? 'bg-green-500 text-white' :
                                        'bg-white text-gray-700 hover:scale-105'}
                            `}
                        >
                            {isListening ? '⏹' : ''}
                        </button>

                        <p className="mt-4 text-gray-600">
                            {isListening ? 'Listening...' :
                                isSpeaking ? 'Speaking...' :
                                    'Click mic to start'}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Speak clearly and describe your symptoms
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full mx-4">
                        <h2 className="text-xl font-medium text-gray-800 mb-4">
                            Medical Report
                        </h2>

                        <div className="prose max-w-none mb-6 text-gray-600">
                            {report.split('\n').map((line, index) => (
                                line.trim() ? (
                                    <p key={index} className="mb-2">
                                        {line.replace(/^[-*]/, '•')}
                                    </p>
                                ) : <br key={index} />
                            ))}
                        </div>

                        <Test reportData={report} appointmentId={appointmentId} />

                        <button
                            onClick={() => {
                                setReport(null);
                                setAppointmentId(null);
                                startConversation();
                            }}
                            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                            Start New Consultation
                        </button>
                    </div>
                )}
            </main>

            <footer className="bg-white py-4 text-center text-sm text-gray-500 shadow-inner">
                <p>© 2024 Cavista Healthcare</p>
            </footer>
        </div>
    );
};

export default TalkAI; 