// components/BookingForm.jsx
import React, { useState } from 'react';

const BookingForm = ({ apartment, selectedDates, onSubmit }) => {
  const [guests, setGuests] = useState(1);
  
  const calculateTotalPrice = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    const days = Math.ceil(
      (selectedDates.end - selectedDates.start) / (1000 * 60 * 60 * 24)
    );
    return (apartment.price / 365) * days;
  };

  return (
    <div className="p-4 border-t">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <input
            type="number"
            min="1"
            max={apartment.maxGuests || 4}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <div className="flex justify-between mb-2">
            <span>Daily Rate</span>
            <span>IDR {Math.round(apartment.price / 365).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>IDR {Math.round(calculateTotalPrice()).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;