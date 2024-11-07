import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaCopy } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function UserProfileViewOnly() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false); // Added state for copy success
  const { slug } = useParams();

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

  const handleCopyUrl = () => {
    if (user) {
      const profileUrl = `${window.location.origin}/profile/${user.slug}`;
      navigator.clipboard.writeText(profileUrl)
        .then(() => {
          setCopySuccess(true); // Set copy success to true
          setTimeout(() => setCopySuccess(false), 2000); // Reset copy success after 2 seconds
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0B2F21]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-white">Loading profile...</p>
      </div>
    );
  }

  const profileUrl = `${window.location.origin}/profile/${user.slug}`;

  return (
    <div className="flex justify-center items-center h-screen" style={{ background: 'linear-gradient(to right, #1DA1F2, #1877F2, #FF0000, #F58529)' }}>
      <div className="profile-card bg-black text-white shadow-lg rounded-lg p-8 w-full max-w-md">
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
              onClick={handleCopyUrl}
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
      </div>
    </div>
  );
}

export default UserProfileViewOnly;
