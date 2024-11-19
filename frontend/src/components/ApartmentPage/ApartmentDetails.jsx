import ApartmentMainInfo from './ApartmentMainInfo'
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList'
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const ApartmentDetails = ({ apartment }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews when component mounts or apartment changes
  useEffect(() => {
    const fetchReviews = async () => {
      if (!apartment || !apartment.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch reviews for specific apartment
        const response = await axios.get(`/review/${apartment.id}`);
        
        // Ensure reviews is an array
        const fetchedReviews = Array.isArray(response.data) 
          ? response.data 
          : response.data.reviews || [];

        setReviews(fetchedReviews);
        console.log(fetchedReviews)
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.response?.data?.message || 'Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [apartment?.id]);

  const handleReviewSubmit = async ({rating,comment}) => {

    try {
      // Send review to backend
      const response = await axios.post(`/review/${apartment.id}`, {
        rating : rating,
        text : comment,
        address : "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      });

      // Assuming the backend returns the created review
      const createdReview = { rating , text : comment , timestamp : new Date()};

      // Update local reviews state
      setReviews([...reviews, createdReview]);
    } catch (err) {
      console.error('Error submitting review:', err);
      // Optionally, show error to user
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ApartmentMainInfo apartment={apartment} />
      <ReviewForm 
        onSubmit={handleReviewSubmit} 
        apartmentId={apartment.id}
      />
      <ReviewList 
        reviews={reviews} 
      />
    </div>
  );
};

export default ApartmentDetails;