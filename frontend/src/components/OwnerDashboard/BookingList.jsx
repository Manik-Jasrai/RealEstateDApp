import React from 'react';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/Date';

const BookingList = ({ bookings }) => {
  const getStatusStyle = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      upcoming: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      ongoing: "bg-yellow-100 text-yellow-800"
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking History</h2>
      <div className="space-y-4">
        {bookings.map(booking => (
          <div 
            key={booking.id} 
            className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={booking.property.image} 
                alt={booking.property.name} 
                className="w-16 h-16 rounded-md object-cover" 
              />
              <div>
                <h3 className="font-semibold">{booking.property.name}</h3>
                <div className="flex space-x-4 text-gray-600 text-sm">
                  <span>
                    <Calendar className="inline-block mr-1 w-4 h-4" /> 
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </span>
                  <span>
                    <Users className="inline-block mr-1 w-4 h-4" /> 
                    {booking.guests} Guests
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(booking.price)}
              </span>
              <button className="text-blue-600 hover:text-blue-800">
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;