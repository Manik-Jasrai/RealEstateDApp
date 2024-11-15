import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Home, 
  DollarSign, 
  MapPin, 
  ChevronRight,
  Users,
  Filter,
  X,
  Search
} from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulated API call
        const mockBookings = [
          {
            id: "1",
            propertyName: "Luxury Beachfront Villa",
            location: "Miami Beach, FL",
            checkIn: "2024-11-20",
            checkOut: "2024-11-25",
            price: 1250,
            guests: 4,
            status: "upcoming",
            image: "/a.jpg",
            bookingDate: "2024-11-01"
          },
          {
            id: "2",
            propertyName: "Mountain View Cabin",
            location: "Aspen, CO",
            checkIn: "2024-10-15",
            checkOut: "2024-10-20",
            price: 800,
            guests: 2,
            status: "completed",
            image: "/a.jpg",
            bookingDate: "2024-10-01"
          },
          {
            id: "3",
            propertyName: "Downtown Loft",
            location: "New York, NY",
            checkIn: "2024-09-05",
            checkOut: "2024-09-10",
            price: 1500,
            guests: 3,
            status: "cancelled",
            image: "/a.jpg",
            bookingDate: "2024-08-20"
          }
        ];

        // Sort bookings by date in descending order
        const sortedBookings = mockBookings.sort((a, b) => 
          new Date(b.bookingDate) - new Date(a.bookingDate)
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      upcoming: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      ongoing: "bg-yellow-100 text-yellow-800"
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const filteredBookings = bookings
    .filter(booking => filterStatus === 'all' || booking.status === filterStatus)
    .filter(booking => 
      booking.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          <p className="mt-2 text-gray-600">View and manage your property bookings</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by property or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Bookings</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Property Image */}
                  <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.propertyName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {booking.propertyName}
                        </h3>
                        <p className="mt-1 text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-in
                        </p>
                        <p className="mt-1 font-medium">{formatDate(booking.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-out
                        </p>
                        <p className="mt-1 font-medium">{formatDate(booking.checkOut)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Guests
                        </p>
                        <p className="mt-1 font-medium">{booking.guests} guests</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Total Price
                        </p>
                        <p className="mt-1 font-medium">{formatCurrency(booking.price)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => {/* Handle view details */}}
                    >
                      View Details
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </button>
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