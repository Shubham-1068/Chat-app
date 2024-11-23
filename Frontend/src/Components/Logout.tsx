import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: { returnTo: window.location.origin } 
    });
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:px-3 sm:py-1 sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-4 h-4 sm:w-5 sm:h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
      <span className="hidden sm:inline">Log Out</span>
    </button>
  );
};

export default LogoutButton;

