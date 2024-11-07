import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Profile = () => {
  const [user, setUser] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${slug}`);
      console.log('API Response:', response.data); // Log the response to inspect it
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_image');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center text-green-500"
      style={{
        backgroundImage: `url('https://example.com/forest_background.jpg')`, // Replace with your actual image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-gray-900 bg-opacity-90 shadow-md rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-300">Profile</h2>

        {/* Display Profile Image */}
        <div className="flex justify-center mb-4">
          {user && user.profile_image ? (
            <img
              src={user.profile_image}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex justify-center items-center text-2xl font-bold text-green-500">
              {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>

        {/* Display Username */}
        <h3 className="text-xl font-semibold mb-4 text-green-300">
          {user ? user.username : 'Username not available'}
        </h3>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
