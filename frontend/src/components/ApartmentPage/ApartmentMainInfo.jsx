import { FaBed, FaBath } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Modal from '../Booking/Modal';
import Calendar from '../Booking/Calender';
import BookingForm from '../Booking/BookingForm';
import { useAppKitAccount } from '@reown/appkit/react';

const ApartmentMainInfo = ({ apartment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [bookedDates, setBookedDates] = useState([]);
  const [numGuests, setNumGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {address} = useAppKitAccount();

  // Fetch unavailable dates using axios
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/booking/unavl/${apartment.id}`);
        
        // Assuming response.data is an array of dates in string format
        // Convert the dates to Date objects
        const unavailableDates = response.data.map(date => new Date(date));
        setBookedDates(unavailableDates);
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
        setError('Failed to fetch unavailable dates');
        // Set some default booked dates in case of error
        setBookedDates([
          new Date('2024-12-10'),
          new Date('2024-12-11'),
          new Date('2024-12-12')
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnavailableDates();
  }, [apartment.id]);

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      date.toDateString() === bookedDate.toDateString()
    );
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      setIsLoading(true);
      const bookingRequest = {
        address: address,
        aptid: apartment.id,
        checkInDate: selectedDates.start.toISOString(),
        checkOutDate: selectedDates.end.toISOString(),
        numGuests: numGuests
      };

      const response = await axios.post('/booking', bookingRequest);
      console.log('Booking successful:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError('Failed to submit booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (type, date) => {
    // Check if the selected date is booked
    if (isDateBooked(date)) {
      setError('This date is already booked');
      return;
    }

    setSelectedDates(prev => ({
      ...prev,
      [type]: date
    }));
    setError(null);
  };

  // Validate that no dates between start and end are booked
  const validateDateRange = (start, end) => {
    if (!start || !end) return true;
    
    const current = new Date(start);
    while (current <= end) {
      if (isDateBooked(current)) {
        return false;
      }
      current.setDate(current.getDate() + 1);
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative">
          <img 
            src={'/a.jpg'} 
            alt={apartment.name} 
            className="w-full h-72 object-cover" 
          />
          <div className="absolute top-4 left-4 bg-white rounded-md px-3 py-1 text-sm font-medium text-gray-800">
            {apartment.price / 1e18}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{apartment.name}</h2>
          <div className="flex items-center text-gray-600 mb-4">
            <IoLocationSharp className="mr-2" />
            <span>{apartment.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FaBed className="mr-2" />
            <span>{apartment.rooms} Bedrooms</span>
          </div>
          <p className="text-gray-700 mb-6">{apartment.description}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Book Now'}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Check-in Date</h4>
              <Calendar
                selectedDate={selectedDates.start}
                onDateSelect={(date) => handleDateSelect('start', date)}
                bookedDates={bookedDates}
                maxDate={selectedDates.end}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Check-out Date</h4>
              <Calendar
                selectedDate={selectedDates.end}
                onDateSelect={(date) => handleDateSelect('end', date)}
                bookedDates={bookedDates}
                minDate={selectedDates.start || new Date()}
              />
            </div>
          </div>

          {selectedDates.start && selectedDates.end && validateDateRange(selectedDates.start, selectedDates.end) && (
            <BookingForm
              apartment={apartment}
              selectedDates={selectedDates}
              onSubmit={handleBookingSubmit}
            />
          )}

          <div className="flex justify-end space-x-3 mt-4 border-t pt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApartmentMainInfo;