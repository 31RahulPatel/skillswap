import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    if (result.success) {
      navigate('/browse');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Welcome Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-blue-500 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-muted text-lg font-inter">Sign in to continue your skill journey</p>
        </div>

        {/* Login Form */}
        <div className="glass-card rounded-3xl p-8 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          {error && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl mb-6 backdrop-blur-sm animate-fadeInUp">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                📧 Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                🔒 Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 px-6 rounded-2xl font-semibold font-inter disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing you in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-muted text-sm font-inter">or</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-secondary font-inter mb-4">
              New to SkillSwap?
            </p>
            <Link 
              to="/register" 
              className="btn-secondary w-full py-3 px-6 rounded-2xl font-medium font-inter inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create New Account
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <p className="text-muted text-sm font-inter mb-4">Join thousands of skill swappers</p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 font-poppins">10K+</div>
              <div className="text-xs text-muted font-inter">Skills Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 font-poppins">5K+</div>
              <div className="text-xs text-muted font-inter">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-500 font-poppins">98%</div>
              <div className="text-xs text-muted font-inter">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;