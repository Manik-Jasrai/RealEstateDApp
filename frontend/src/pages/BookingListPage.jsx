import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { 
  Calendar, 
  ChevronRight,
  Users,
  MapPin
} from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default wallet address (can be replaced with actual user's address)
  const DEFAULT_WALLET_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const bookingsResponse = await axios.get(`/booking/user/${DEFAULT_WALLET_ADDRESS}`);

        // Fetch apartment details for each booking
        const bookingsWithApartments = await Promise.all(
          bookingsResponse.data.map(async (booking) => {
            try {
              const apartmentResponse = await axios.get(`/apartment/${booking.apartmentId}`);
              console.log(apartmentResponse)
              return {
                ...booking,
                apartmentName: apartmentResponse.data.name,
                apartmentLocation: apartmentResponse.data.location
              };
            } catch (apartmentErr) {
              console.error(`Failed to fetch apartment details for ID ${booking.apartmentId}`, apartmentErr);
              return {
                ...booking,
                apartmentName: 'Unknown Apartment',
                apartmentLocation: 'Unknown Location'
              };
            }
          })
        );

        // Sort bookings by date in descending order
        const sortedBookings = bookingsWithApartments.sort((a, b) => 
          new Date(b.checkInDate) - new Date(a.checkInDate)
        );
        
        setBookings(sortedBookings);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
          <p className="mt-2 text-gray-600">View your property bookings</p>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Booking Details */}
                  <div className="flex-1">
                    {/* Apartment Name and Location */}
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">{booking.apartmentName}</h2>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {booking.apartmentLocation}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-in
                        </p>
                        <p className="mt-1 font-medium">{formatDate(booking.checkInDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-out
                        </p>
                        <p className="mt-1 font-medium">{formatDate(booking.checkOutDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Guests
                        </p>
                        <p className="mt-1 font-medium">{booking.numGuests} guests</p>
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;