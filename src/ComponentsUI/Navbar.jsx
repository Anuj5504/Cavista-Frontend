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
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-3">
            <img className='w-10 h-10 rounded-full' src={logo} alt="HealthSetu Logo" />
            <span className="text-xl font-bold text-blue-600">HealthSetu</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {['Overview', 'Features', 'About Us', 'Contact'].map((item) => (
                <a key={item} className="text-gray-600 hover:text-blue-600 font-medium transition duration-200" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>

            {role ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {role}</span>
                <Button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition duration-200"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Login
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 transition duration-200"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['Overview', 'Features', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                className="text-gray-600 hover:text-blue-600 font-medium py-2 transition duration-200"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
            {role ? (
              <>
                <div className="text-gray-600">Welcome, {role}</div>
                <Button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 w-full py-2 rounded-lg transition duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
