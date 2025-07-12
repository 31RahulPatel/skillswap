import React, { useState, useEffect, useRef } from 'react';
import { usersAPI, uploadAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const Profile = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    availability: '',
    profile_photo_url: ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await usersAPI.updateProfile(profile);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await uploadAPI.uploadProfileImage(formData);
      
      // Update profile with new image URL
      setProfile(prev => ({
        ...prev,
        profile_photo_url: response.data.imageUrl
      }));

      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    }
    setImageUploading(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getImageUrl = () => {
    if (profile.profile_photo_url) {
      return `http://localhost:5001${profile.profile_photo_url}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen px-4 py-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-muted text-lg font-inter">Manage your account and preferences</p>
        </div>

        <div className="glass-card rounded-3xl p-8 animate-fadeInUp">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center mb-8">
            {/* Profile Image */}
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                {getImageUrl() ? (
                  <img
                    src={getImageUrl()}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-3xl">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* Upload Button */}
              <button
                onClick={triggerFileInput}
                disabled={imageUploading}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                title="Change profile picture"
              >
                {imageUploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-semibold text-primary font-poppins mb-2">{profile.name}</h2>
              <p className="text-muted font-inter mb-2 flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="skill-tag px-3 py-1 rounded-full text-xs">
                  🌟 Active Member
                </span>
                <span className="skill-tag px-3 py-1 rounded-full text-xs">
                  🔥 Skill Swapper
                </span>
              </div>
            </div>
          </div>

          {editing ? (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 font-inter"
                    required
                  />
                </div>

                <div>
                  <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    className="input-glass w-full px-4 py-3 rounded-2xl bg-white/5 cursor-not-allowed opacity-60 font-inter"
                    disabled
                  />
                  <p className="text-xs text-muted mt-1 font-inter">Email cannot be changed</p>
                </div>
              </div>

              <div>
                <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                  📍 Location
                </label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="e.g., New York, NY or Remote"
                  className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 font-inter"
                />
              </div>

              <div>
                <label className="block text-secondary text-sm font-semibold mb-3 font-inter">
                  🕒 Availability
                </label>
                <input
                  type="text"
                  value={profile.availability || ''}
                  onChange={(e) => setProfile({...profile, availability: e.target.value})}
                  placeholder="e.g., Evenings, Weekends, Flexible"
                  className="input-glass w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 font-inter"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn-secondary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass border border-white/10 rounded-2xl p-6">
                  <label className="block text-secondary text-sm font-semibold mb-2 font-inter">Location</label>
                  <p className="text-lg text-primary font-inter flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {profile.location || 'Not specified'}
                  </p>
                </div>

                <div className="glass border border-white/10 rounded-2xl p-6">
                  <label className="block text-secondary text-sm font-semibold mb-2 font-inter">Availability</label>
                  <p className="text-lg text-primary font-inter flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {profile.availability || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="glass border border-white/10 rounded-2xl p-6">
                <label className="block text-secondary text-sm font-semibold mb-2 font-inter">Account Status</label>
                <div className="flex items-center space-x-4">
                  <span className="status-accepted px-4 py-2 rounded-full text-sm font-medium">
                    ✅ Active Account
                  </span>
                  <span className="skill-tag px-4 py-2 rounded-full text-sm font-medium">
                    🎯 Ready to Swap
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="btn-primary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="btn-secondary flex-1 py-3 px-6 rounded-2xl font-semibold font-inter border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Stats */}
        <div className="glass-card rounded-3xl p-8 mt-8 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h3 className="text-lg font-semibold text-primary mb-6 font-poppins text-center">Profile Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-blue-400 font-poppins">Profile</div>
              <div className="text-secondary text-sm font-inter">Complete</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-green-400 font-poppins">Skills</div>
              <div className="text-secondary text-sm font-inter">Ready</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="text-xl font-bold text-purple-400 font-poppins">Swaps</div>
              <div className="text-secondary text-sm font-inter">Active</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-amber-400 font-poppins">Rating</div>
              <div className="text-secondary text-sm font-inter">Excellent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;