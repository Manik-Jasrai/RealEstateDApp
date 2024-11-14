import ApartmentMainInfo from './ApartmentMainInfo'
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList'
import React, {useState} from 'react';

const ApartmentDetails = ({ apartment }) => {
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ApartmentMainInfo apartment={apartment} />
      <ReviewForm onSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ApartmentDetails;