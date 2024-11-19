import React, { useState } from 'react';

const BookingForm = ({ apartment, selectedDates, onSubmit }) => {
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const calculateTotalPrice = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    const days = Math.ceil(
      (selectedDates.end - selectedDates.start) / (1000 * 60 * 60 * 24)
    );
    return (apartment.price) * days;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const bookingData = {
        address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // You might want to get this from props or context
        aptid: apartment.id,
        checkInDate: selectedDates.start.toISOString(),
        checkOutDate: selectedDates.end.toISOString(),
        numGuests: guests
      };

      await onSubmit(bookingData);
    } catch (err) {
      setError(err.message || 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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
            required
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <div className="flex justify-between mb-2">
            <span>Daily Rate</span>
            <span>{apartment.price / 1e18} ETH</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Platform Fee</span>
            <span>0.05 ETH</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{(calculateTotalPrice() / 1e18).toFixed(4)} ETH + Platform Fee</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !selectedDates.start || !selectedDates.end}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              isSubmitting ? 
              'bg-gray-400 cursor-not-allowed' : 
              'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;