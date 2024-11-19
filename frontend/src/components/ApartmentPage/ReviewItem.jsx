import { StarIcon } from 'lucide-react';
import React from 'react';

const ReviewItem = ({ review }) => (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <div className="flex items-center mb-2">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${
                index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600 text-sm">
          {new Date(review.timestamp).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700">{review.text}</p>
    </div>
  );

  export default ReviewItem