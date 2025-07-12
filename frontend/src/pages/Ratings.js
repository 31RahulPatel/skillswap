import React, { useState, useEffect } from 'react';
import { ratingsAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await ratingsAPI.getUserRatings(user.id);
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
    setLoading(false);
  };

  const renderStars = (score) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  };

  const averageRating = ratings.length > 0 
    ? (ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length).toFixed(1)
    : 0;

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Ratings & Feedback</h1>

      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">{averageRating}</div>
          <div className="text-2xl text-yellow-500 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-gray-600">Based on {ratings.length} reviews</p>
        </div>
      </div>

      {/* Individual Ratings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        {ratings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No ratings received yet</p>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      {rating.rater_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold">{rating.rater_name}</h3>
                      <div className="text-yellow-500">{renderStars(rating.score)}</div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="text-gray-700 ml-13">{rating.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;