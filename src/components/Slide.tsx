import React from 'react';

interface SlideProps {
  isPresentation: boolean;
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ isPresentation, children }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col overflow-auto transition-all duration-300">
      <div className={`w-full min-h-full ${isPresentation ? 'p-8' : 'p-6'} flex flex-col relative z-10`}>
        {children}
      </div>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>
    </div>
  );
};

export default Slide;
