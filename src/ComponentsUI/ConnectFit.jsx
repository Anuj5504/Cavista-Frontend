import React from 'react'

function ConnectFit() {
    const handleConnectGoogleFit = () => {
        // Logic to connect with Google Fit
        console.log('Connecting to Google Fit...');
        // You would typically initiate the OAuth flow here
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <button
                onClick={handleConnectGoogleFit}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Connect with Google Fit
            </button>
        </div>
    )
}
export default ConnectFit