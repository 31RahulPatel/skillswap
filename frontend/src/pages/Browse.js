import React, { useState, useEffect } from 'react';
import { usersAPI, swapsAPI } from '../services/api';
import { useTheme } from '../hooks/useTheme';

const Browse = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [swapRequest, setSwapRequest] = useState({
    skill_offered: '',
    skill_requested: '',
    message: ''
  });
  const { isDark } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.searchUsers({ skill: searchTerm, location });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const sendSwapRequest = async (e) => {
    e.preventDefault();
    try {
      await swapsAPI.sendSwapRequest({
        receiver_id: selectedUser.id,
        ...swapRequest
      });
      alert('Swap request sent successfully!');
      setSelectedUser(null);
      setSwapRequest({ skill_offered: '', skill_requested: '', message: '' });
    } catch (error) {
      alert('Error sending swap request');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold font-poppins bg-gradient-to-r from-blue-500 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Discover Amazing Skills
          </h1>
          <p className="text-muted text-xl font-inter max-w-2xl mx-auto">
            Connect with talented people worldwide and exchange knowledge that matters
          </p>
        </div>
        
        {/* Advanced Search Form */}
        <form onSubmit={handleSearch} className="glass-card rounded-3xl p-8 mb-8 animate-fadeInUp">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-primary font-poppins">Find Your Perfect Skill Match</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                🎯 Search Skills
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="JavaScript, Guitar, Cooking, Photography..."
                className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                📍 Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="New York, Remote, London..."
                className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="btn-primary w-full py-4 px-6 rounded-2xl font-semibold font-inter"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Skills
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* Results Header */}
        {!loading && users.length > 0 && (
          <div className="flex items-center justify-between mb-8 animate-fadeInUp">
            <div>
              <h3 className="text-2xl font-bold text-primary font-poppins">
                {users.length} Talented People Found
              </h3>
              <p className="text-secondary font-inter">Ready to share their knowledge with you</p>
            </div>
            <div className="flex items-center space-x-2 text-muted text-sm font-inter">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Click any card to connect</span>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-primary mb-2 font-poppins">Finding Amazing People</h3>
            <p className="text-secondary font-inter">Searching through our community of skill swappers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                className="glass-card rounded-3xl p-6 animate-fadeInUp cursor-pointer group" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* User Header */}
                <div className="flex items-center mb-6">
                  <div className="avatar w-16 h-16 rounded-full text-xl font-bold mr-4 group-hover:scale-110 transition-transform duration-300">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg font-poppins group-hover:text-blue-500 transition-colors duration-300">
                      {user.name}
                    </h3>
                    <p className="text-secondary text-sm font-inter flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {user.location || 'Location not set'}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Skills Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-secondary text-sm font-semibold font-inter">Available Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skills && user.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="skill-tag px-3 py-2 rounded-xl text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {user.skills && user.skills.length > 4 && (
                      <span className="skill-tag px-3 py-2 rounded-xl text-xs font-medium opacity-70">
                        +{user.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6 p-3 glass rounded-2xl">
                  <div className="flex items-center text-secondary text-sm font-inter">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Available:</span>
                    <span className="ml-1">{user.availability || 'Flexible schedule'}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedUser(user)}
                  className="btn-primary w-full py-3 px-6 rounded-2xl font-semibold font-inter group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Connect & Swap
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {users.length === 0 && !loading && (
          <div className="text-center py-20 animate-fadeInUp">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3 font-poppins">No Skills Found</h3>
            <p className="text-secondary font-inter mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or explore different skill categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setLocation('');
                fetchUsers();
              }}
              className="btn-secondary px-8 py-3 rounded-2xl font-medium font-inter"
            >
              Show All Skills
            </button>
          </div>
        )}

        {/* Enhanced Swap Request Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp">
            <div className="glass-card rounded-3xl p-8 max-w-lg w-full">
              {/* Modal Header */}
              <div className="text-center mb-8">
                <div className="avatar w-20 h-20 rounded-full text-2xl font-bold mx-auto mb-4">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-primary font-poppins mb-2">
                  Connect with {selectedUser.name}
                </h3>
                <p className="text-secondary font-inter">Send a skill swap request</p>
              </div>
              
              <form onSubmit={sendSwapRequest} className="space-y-6">
                <div>
                  <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                    🎓 Skill You're Offering
                  </label>
                  <input
                    type="text"
                    value={swapRequest.skill_offered}
                    onChange={(e) => setSwapRequest({...swapRequest, skill_offered: e.target.value})}
                    className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
                    placeholder="What skill can you teach them?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                    📚 Skill You Want to Learn
                  </label>
                  <input
                    type="text"
                    value={swapRequest.skill_requested}
                    onChange={(e) => setSwapRequest({...swapRequest, skill_requested: e.target.value})}
                    className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-inter"
                    placeholder="What do you want to learn from them?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                    💬 Personal Message
                  </label>
                  <textarea
                    value={swapRequest.message}
                    onChange={(e) => setSwapRequest({...swapRequest, message: e.target.value})}
                    className="input-glass w-full px-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none font-inter"
                    rows="4"
                    placeholder="Tell them why you'd like to swap skills and what makes this exchange valuable..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="btn-secondary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Request
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;