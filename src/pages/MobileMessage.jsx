// src/components/MobileMessage.jsx
import React, { useState, useEffect } from 'react';

const MobileMessage = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-200 opacity-70" aria-hidden="true"></div>
      <div className="relative z-10 p-6 bg-blue-600 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">Download Our Mobile App</h2>
        <p className="text-lg mb-6">To get the best experience, please download our mobile app from the App Store or Google Play.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200">App Store</a>
          <a href="#" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200">Google Play</a>
        </div>
      </div>
    </div>
  );
};

export default MobileMessage;
