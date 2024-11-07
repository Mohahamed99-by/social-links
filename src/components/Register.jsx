import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        password,
        profile_image: profileImage,
      });
      setLoading(false);
      navigate(`/${response.data.slug}`);
    } catch (err) {
      setLoading(false);
      setError('Error registering user');
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-screen bg-cover bg-center" 
      style={{
        background: 'linear-gradient(to right, #1DA1F2, #1877F2, #FF0000, #F58529)', // Gradient inspired by social media colors
      }}
    >
      <div className="bg-[#0B2F21] bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#1A5339]">Register</h2>
        
        {/* Error Message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Username */}
          <div>
            <label className="block font-medium mb-2 text-[#206F40]" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#0B2F21] text-white border border-[#1A5339] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#206F40]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-2 text-[#206F40]" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0B2F21] text-white border border-[#1A5339] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#206F40]"
              required
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block font-medium mb-2 text-[#206F40]" htmlFor="profileImage">
              Profile Image URL:
            </label>
            <input
              id="profileImage"
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="bg-[#0B2F21] text-white border border-[#1A5339] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#206F40]"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className={`bg-[#1A5339] hover:bg-[#206F40] text-white font-medium py-2 px-4 rounded-lg w-full transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center text-white">
          <span>Already have an account?</span>
          <button
            onClick={() => navigate('/login')}
            className="text-[#206F40] hover:text-[#1A5339] ml-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
