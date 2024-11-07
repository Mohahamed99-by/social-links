import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check if the user is logged in based on token
  const isLoggedIn = localStorage.getItem('token');
  const profileImage = localStorage.getItem('profile_image');
  const username = localStorage.getItem('username');

  // Handle Logout Action
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username');
    localStorage.removeItem('profile_image');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-green-500 text-2xl font-semibold">
          MyApp
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
          <Link 
            to="/" 
            className="text-white hover:text-green-400 transition-colors duration-200"
          >
            Home
          </Link>

          {/* Conditional Rendering Based on Authentication */}
          {isLoggedIn ? (
            <>
              {/* Profile Image */}
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt={`${username}'s profile`} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-500 hover:opacity-80 transition-opacity duration-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex justify-center items-center text-white font-semibold hover:opacity-80 transition-opacity duration-200">
                      {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-white hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 py-2 px-4 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
