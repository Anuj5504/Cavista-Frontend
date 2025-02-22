import React from 'react'
import { FaUsers, FaLock } from 'react-icons/fa'

const CreateFamily = () => {
    const handleCreateFamily = () => {
        console.log("creating family...")
    }
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen ">
                <div className='flex flex-col w-80 gap-5 bg-white p-6 border-none rounded-3xl shadow-lg'>
                    <h2 className="text-2xl font-bold text-center text-blue-500">Create Family</h2>

                    <div className="flex items-center border-b border-blue-500 py-2">
                        <FaUsers className="text-blue-500 mr-3" />
                        <input
                            type="text"
                            placeholder='Enter Family Name'
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center border-b border-blue-500 py-2">
                        <FaUsers className="text-blue-500 mr-3" />
                        <input
                            type="text"
                            placeholder='Create Family ID'
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center border-b border-blue-500 py-2">
                        <FaLock className="text-blue-500 mr-3" />
                        <input
                            type="password"
                            placeholder='Enter Family Password'
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        />
                    </div>

                    <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleCreateFamily}>
                        Create Family
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateFamily