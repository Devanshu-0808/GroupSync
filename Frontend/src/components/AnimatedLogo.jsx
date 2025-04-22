import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

const AnimatedLogo = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="flex items-center">
      <div className={`transform transition-all duration-1000 ${isAnimated ? 'translate-x-0 rotate-0 opacity-100' : '-translate-x-full rotate-180 opacity-0'}`}>
        <Music className="w-[45px] h-[60px] text-cyan-600" />
      </div>
      <span className={` text-3xl ml-2  font-bold text-white transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        GroupSync
      </span>
    </div>
  );
};

export default AnimatedLogo;
