import React, { useState, useEffect } from 'react'
import { Button } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate('/home');
  };

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [localStorage.getItem('role')]);

  return (
    <div className='py-4 px-4 flex justify-between h-18 font-mono bg-blue-300'>
      <Link to="/home" >Logo</Link>

      <div>
        <ul className='list-none flex flex-row justify-between gap-4'>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 px-2  cursor-pointer'>Overview</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 px-2 cursor-pointer'>Dashboard</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 px-2  cursor-pointer'>Appointments</li>
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <div className="text-black">
          {role ? `Logged in as: ${role}` : 'sign up'}
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
