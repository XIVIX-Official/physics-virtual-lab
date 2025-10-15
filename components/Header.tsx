import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-3 flex flex-col items-center justify-center">
        <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[size:200%] text-transparent bg-clip-text animate-background-pan">
            Codexus Technologies
        </span>
        <h1 className="text-lg text-gray-300 font-semibold tracking-wider mt-1">
          Physics Virtual Lab
        </h1>
      </div>
    </header>
  );
};

export default Header;
