import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-100 py-6  font-mono">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-400">Overview</a>
            <a href="#" className="text-gray-600 hover:text-blue-400">Patient Matrics</a>
            <a href="#" className="text-gray-600 hover:text-blue-400">Appointments</a>
            <a href="#" className="text-gray-600 hover:text-blue-400">Financials</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer