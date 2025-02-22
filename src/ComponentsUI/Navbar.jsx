import React, { useState, useEffect } from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all items in localStorage
    setRole(null); // Update state to reflect logout
    navigate('/home'); // Redirect to home or login page
  };

  useEffect(() => {
    // Update role state when localStorage changes
    setRole(localStorage.getItem('role'));
  }, [localStorage.getItem('role')]);

  return (
    <div className='m-4 flex justify-between h-18 font-mono'>
      <div>Logo</div>

      <div>
        <ul className='list-none flex flex-row justify-between gap-4'>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Overview</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Patient Matrics</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Appointments</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Financials</li>
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <div className="text-black">
          {role ? `Logged in as: ${role}` : 'Not logged in'}
        </div>

        {role && (
          <div>
            <Button className='bg-red-400' onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
