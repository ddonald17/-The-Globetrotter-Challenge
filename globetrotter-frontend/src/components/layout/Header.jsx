import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🌍</span>
          <span>Globetrotter</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/game" className="hover:text-indigo-200 transition">
                Play
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <span className="text-indigo-200">
                    {user.username}
                  </span>
                </li>
                <li>
                  <button 
                    onClick={logout}
                    className="hover:text-indigo-200 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/register" className="hover:text-indigo-200 transition">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;