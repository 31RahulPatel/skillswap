import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav-glass sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle p-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {user ? (
              <>
                <Link 
                  to="/browse" 
                  className="text-secondary hover:text-primary transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-xl"
                >
                  🔍 Browse
                </Link>
                <Link 
                  to="/skills" 
                  className="text-secondary hover:text-primary transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-xl"
                >
                  🎓 My Skills
                </Link>
                <Link 
                  to="/swaps" 
                  className="text-secondary hover:text-primary transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-xl"
                >
                  🔄 Swaps
                </Link>
                <Link 
                  to="/profile" 
                  className="text-secondary hover:text-primary transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-xl"
                >
                  👤 Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary px-6 py-2 rounded-2xl text-sm font-medium"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-secondary hover:text-primary transition-all duration-300 font-medium px-4 py-2 rounded-xl"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary px-6 py-2 rounded-2xl text-sm font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;