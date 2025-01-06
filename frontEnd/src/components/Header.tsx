import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-green-600 text-white py-4 px-6 md:px-12 flex items-center justify-between">
      <h1 className="text-2xl font-bold">My App</h1>
      <button
        onClick={onLogout}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
