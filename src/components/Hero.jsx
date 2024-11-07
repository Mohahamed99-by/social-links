import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-blue-900 text-white h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://example.com/your-image.jpg")', // Replace with your actual image URL
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative text-center z-10 p-8">
        <h1 className="text-4xl font-bold mb-4 text-white"> Welcome toSocial Links Tool</h1>
        <p className="text-xl mb-6">Your journey to a better experience starts here.</p>
        <a
          href="/login"
          className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
