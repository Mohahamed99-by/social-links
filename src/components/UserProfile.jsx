import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${slug}`);
      setUser(response.data.user);
      setLinks(response.data.links);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.post(`http://localhost:3000/api/users/${user.id}/social-links`, newLink);
        setNewLink({ platform: '', url: '' });
        fetchUserData();
        setIsEditing(false);
      } catch (error) {
        console.error('Error adding social link:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    const profileUrl = `${window.location.origin}/${user.slug}`;
    
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: <FaFacebook size={35} color="#3b5998" className="mr-3" />,
      twitter: <FaTwitter size={35} color="#1DA1F2" className="mr-3" />,
      instagram: <FaInstagram size={35} color="#C13584" className="mr-3" />,
      linkedin: <FaLinkedin size={35} color="#0077B5" className="mr-3" />,
      github: <FaGithub size={35} color="#333" className="mr-3" />,
      youtube: <FaYoutube size={35} color="#FF0000" className="mr-3" />,
      default: '🔗',
    };
    return icons[platform.toLowerCase()] || icons.default;
  };

  const handleNext = () => {
    // Navigate to the UserProfileViewOnly page
    navigate(`/profile/${user.slug}`);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0B2F21]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-white">Loading profile...</p>
      </div>
    );
  }

  const profileUrl = `${window.location.origin}/${user.slug}`;

  return (
    <div 
      className="flex justify-center items-center h-screen" 
      style={{
        background: 'linear-gradient(to right, #1DA1F2, #1877F2, #FF0000, #F58529)', // Updated gradient background
      }}
    >
      <div className="profile-card bg-black text-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="profile-header">
          <div className="profile-header flex flex-col items-center">
            {user.profile_image ? (
              <img
                src={user.profile_image}
                alt={user.username}
                className="profile-image rounded-full h-24 w-24 object-cover mx-auto"
              />
            ) : (
              <div className="profile-image-placeholder rounded-full bg-gray-300 h-24 w-24 flex justify-center items-center text-2xl font-bold text-gray-700 mx-auto">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="profile-name text-2xl font-bold mt-4 text-center">{user.username}</h1>
          </div>

          <div className="profile-slug-container mt-4">
            <div className="profile-url-box bg-[#0B2F21] rounded-lg px-4 py-2 flex items-center">
              <span className="profile-url text-gray-300 truncate">{profileUrl}</span>
              <button
                className={`copy-button ml-4 px-3 py-1 rounded-md ${copySuccess ? 'bg-green-500' : 'bg-[#143D2B] hover:bg-[#1A5339]'}`}
                onClick={copyToClipboard}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            {copySuccess && (
              <div className="copy-notification mt-2 text-green-500 font-medium">
                Link copied to clipboard!
              </div>
            )}
          </div>
        </div>

        <div className="social-links-container mt-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card bg-[#0B2F21] hover:bg-[#143D2B] rounded-lg px-4 py-3 flex items-center mb-3"
            >
              {getPlatformIcon(link.platform)}
              <span className="platform-name font-medium">{link.platform}</span>
              <span className="link-arrow ml-auto">→</span>
            </a>
          ))}
        </div>

        {isEditing ? (
          <div className="add-link-form mt-6">
            <form onSubmit={handleAddLink} className="bg-[#0B2F21] rounded-lg px-4 py-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Platform (e.g., Twitter, Instagram)"
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  required
                  className="bg-black border-[#143D2B] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-[#1A5339]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="url"
                  placeholder="https://..."
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  required
                  className="bg-black border-[#143D2B] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-[#1A5339]"
                />
              </div>
              <div className="form-buttons flex justify-end">
                <button type="submit" className="save-button bg-[#1A5339] hover:bg-[#206F40] text-white px-4 py-2 rounded-md mr-2">Save</button>
                <button
                  type="button"
                  className="cancel-button bg-[#143D2B] hover:bg-[#1A5339] text-white px-4 py-2 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            className="add-link-button bg-[#1A5339] hover:bg-[#206F40] text-white px-4 py-2 rounded-md mt-6 w-full"
            onClick={() => setIsEditing(true)}
          >
            Add New Link
          </button>
        )}

        {/* "Next" Button */}
        <button
          className="next-button bg-[#1A5339] hover:bg-[#206F40] text-white px-4 py-2 rounded-md mt-6 w-full"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
