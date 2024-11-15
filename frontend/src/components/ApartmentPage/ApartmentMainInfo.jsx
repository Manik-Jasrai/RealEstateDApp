import { FaBed, FaBath } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import React, {useState} from 'react';
import Modal from '../Booking/Modal';
import Calendar from '../Booking/Calender';
import BookingForm from '../Booking/BookingForm';

// Main Component
const ApartmentMainInfo = ({apartment}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });

  const bookedDates = [
    { start: '2024-11-10', end: '2024-11-15' },
    { start: '2024-11-20', end: '2024-11-25' }
  ];

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative">
          <img src={'/a.jpg'} alt={apartment.name} className="w-full h-72 object-cover" />
          <div className="absolute top-4 left-4 bg-white rounded-md px-3 py-1 text-sm font-medium text-gray-800">
            IDR {apartment.price.toLocaleString()}/yr
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
            <span>{apartment.bedrooms} Bedrooms</span>
            <span className="mx-2">|</span>
            <FaBath className="mr-2" />
            <span>{apartment.bathrooms} Bathrooms</span>
          </div>
          <p className="text-gray-700 mb-6">{apartment.description}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md"
          >
            Book Now
          </button>
        </div>
      </div>
      {/*Modal*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Check-in Date</h4>
              <Calendar
                selectedDate={selectedDates.start}
                onDateSelect={(date) => setSelectedDates(prev => ({ ...prev, start: date }))}
                bookedDates={bookedDates}
                maxDate={selectedDates.end}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Check-out Date</h4>
              <Calendar
                selectedDate={selectedDates.end}
                onDateSelect={(date) => setSelectedDates(prev => ({ ...prev, end: date }))}
                bookedDates={bookedDates}
                minDate={selectedDates.start || new Date()}
              />
            </div>
          </div>

          {selectedDates.start && selectedDates.end && (
            <BookingForm
              apartment={apartment}
              selectedDates={selectedDates}
              onSubmit={handleBookingSubmit}
            />
          )}
          {/*Cancel and Confirm Booking Button */}
          <div className="flex justify-end space-x-3 mt-4 border-t pt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleBookingSubmit({ ...selectedDates })}
              disabled={!selectedDates.start || !selectedDates.end}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:bg-gray-300"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApartmentMainInfo;