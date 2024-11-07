// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import UserProfileViewOnly from './components/UserProfileViewOnly';


function App() {
  return (
    <Router>
      <div className="App">
       
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<UserProfile />} />
          <Route path="/profile/:slug" element={<UserProfileViewOnly />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
