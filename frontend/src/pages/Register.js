import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/browse');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="glass-card rounded-3xl p-8 w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-poppins bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Join SkillSwap
          </h2>
          <p className="text-slate-400 font-inter">Create your account and start swapping skills</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 font-inter">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 font-inter">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 font-inter">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2 font-inter">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 px-6 rounded-2xl font-medium font-inter disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 font-inter">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;