import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="border-cyan-600 border-2 p-6 rounded-xl transform hover:scale-105 transition-transform">
    <div className="bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-3xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-xl">{description}</p>
  </div>
);

export default FeatureCard;
