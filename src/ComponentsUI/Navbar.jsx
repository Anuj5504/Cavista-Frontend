import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate('/home');
  };

  return (
    <nav className="bg-blue-300 py-4 px-6 flex justify-between items-center">
      <Link to="/home" className="text-lg font-bold">Logo</Link>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Nav Links (Desktop) */}
      <ul className="hidden md:flex space-x-6">
        <li className="hover:bg-blue-400 rounded-2xl px-4 py-2 cursor-pointer">Overview</li>
        <li className="hover:bg-blue-400 rounded-2xl px-4 py-2 cursor-pointer">Dashboard</li>
        <li className="hover:bg-blue-400 rounded-2xl px-4 py-2 cursor-pointer">Appointments</li>
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {role && <span className="text-black">Logged in as: {role}</span>}
        {role && <Button className="bg-red-400" onClick={handleLogout}>Logout</Button>}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-300 flex flex-col items-center space-y-4 py-4 shadow-lg">
          <Link to="/home" className="hover:bg-blue-400 px-4 py-2 rounded">Overview</Link>
          <Link to="/dashboard" className="hover:bg-blue-400 px-4 py-2 rounded">Dashboard</Link>
          <Link to="/appointments" className="hover:bg-blue-400 px-4 py-2 rounded">Appointments</Link>
          {role && <span className="text-black">Logged in as: {role}</span>}
          {role && <Button className="bg-red-400 w-full" onClick={handleLogout}>Logout</Button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
