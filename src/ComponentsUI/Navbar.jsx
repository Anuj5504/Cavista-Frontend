import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../Assets/maskable_icon_x192.jpg'
const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateRole = () => {
      const currentRole = localStorage.getItem('role');
      setRole(currentRole);
    };

    const handleStorageChange = (e) => {
      if (e.key === 'role' || e.key === 'token') {
        updateRole();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('roleChange', updateRole);

    updateRole();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('roleChange', updateRole);
    };
  }, [localStorage.getItem('role')]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    window.dispatchEvent(new Event('roleChange'));
    navigate('/home');
  };

  const handleDashboardClick = () => {
    if (!role) return;

    switch (role.toLowerCase()) {
      case 'patient':
        navigate('/family');
        break;
      case 'healthcare':
        navigate('/healthproviderdashboard');
        break;
      case 'caregiver':
        navigate('/caregiver');
        break;
      default:
        break;
    }
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="w-1/4">
          <Link to="/home" className="text-lg font-bold">
            <img className='h-10 w-10 rounded-full' src={logo} alt="" />
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 justify-center w-2/4">
          <Link to="/home">
            <li className="hover:bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer transition-colors duration-200">Home</li>
          </Link>
          <li
            onClick={handleDashboardClick}
            className={`hover:bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer transition-colors duration-200 ${!role && 'opacity-50 cursor-not-allowed'}`}
          >
            Dashboard
          </li>
          <Link to={role === 'patient' ? "/talk-ai" : "#"}>
            <li className={`hover:bg-gray-100 rounded-2xl px-4 py-2 cursor-pointer transition-colors duration-200 ${role !== 'patient' && 'opacity-50 cursor-not-allowed'}`}>
              Appointments
            </li>
          </Link>
        </ul>

        <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
          {role && <span className="text-gray-700">Logged in as: {role}</span>}
          {role && <Button className="bg-red-500 hover:bg-red-600 transition-colors duration-200" onClick={handleLogout}>Logout</Button>}
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white flex flex-col items-center space-y-4 py-4 shadow-lg">
            <Link to="/home" className="hover:bg-gray-100 px-4 py-2 rounded w-full text-center transition-colors duration-200">
              Home
            </Link>
            <button
              onClick={handleDashboardClick}
              className={`hover:bg-gray-100 px-4 py-2 rounded w-full transition-colors duration-200 ${!role && 'opacity-50 cursor-not-allowed'}`}
            >
              Dashboard
            </button>
            <Link
              to={role === 'patient' ? "/talk-ai" : "#"}
              className={`hover:bg-gray-100 px-4 py-2 rounded w-full text-center transition-colors duration-200 ${role !== 'patient' && 'opacity-50 cursor-not-allowed'}`}
            >
              Appointments
            </Link>
            {role && <span className="text-gray-700">Logged in as: {role}</span>}
            {role && <Button className="bg-red-500 hover:bg-red-600 transition-colors duration-200 w-full" onClick={handleLogout}>Logout</Button>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
