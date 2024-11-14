import ReviewItem from "./ReviewItem";
import React from 'react'

const ReviewList = ({ reviews }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h3>
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))
          )}
        </div>
      </div>
    );
  };

export default ReviewList