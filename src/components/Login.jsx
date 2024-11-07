import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });

      setLoading(false);
      localStorage.setItem('token', response.data.token); // Store JWT in localStorage
      navigate(`/${response.data.user.slug}`);  // Redirect to the user's profile page
    } catch (err) {
      setLoading(false);
      setError('Invalid username or password');
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-screen" 
      style={{
        background: 'linear-gradient(to right, #1DA1F2, #1877F2, #FF0000, #F58529)', // Updated gradient background
      }}
    >
      <div className="bg-black bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-[#1A5339] text-center">Login</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
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
          <button
            type="submit"
            className={`bg-[#1A5339] hover:bg-[#206F40] text-white font-medium py-2 px-4 rounded-lg w-full transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-white">
          <span>Don't have an account?</span>
          <button
            onClick={() => navigate('/register')}
            className="text-[#206F40] hover:text-[#1A5339] ml-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
