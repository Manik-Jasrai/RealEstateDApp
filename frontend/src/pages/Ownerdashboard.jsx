import React, { useState } from 'react';
import PropertyList from '../components/OwnerDashboard/PropertyList';
import BookingList from '../components/OwnerDashboard/BookingList';

const ApartmentOwnerDashboard = () => {
  const [properties, setProperties] = useState([
    {
      id: "1",
      name: "Luxury Beachfront Villa",
      location: "Miami Beach, FL",
      image: "/a.jpg"
    },
    {
      id: "2", 
      name: "Mountain View Cabin",
      location: "Aspen, CO", 
      image: "/a.jpg"
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: "1",
      property: {
        name: "Luxury Beachfront Villa",
        image: "/a.jpg"
      },
      checkIn: "2024-11-20",
      checkOut: "2024-11-25",
      guests: 4,
      price: 1250,
      status: "upcoming"
    },
    {
      id: "2", 
      property: {
        name: "Mountain View Cabin",
        image: "/a.jpg"
      },
      checkIn: "2024-10-15",
      checkOut: "2024-10-20",
      guests: 2,
      price: 800,
      status: "completed"
    }
  ]);

  const handleAddProperty = () => {
    console.log("Add Property");
  };

  const handleEditProperty = (property) => {
    console.log("Edit Property", property);
  };

  const handleDeleteProperty = (propertyId) => {
    console.log("Delete Property", propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Apartment Owner Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your properties and bookings</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <PropertyList 
            properties={properties}
            onAddProperty={handleAddProperty}
            onEditProperty={handleEditProperty}
            onDeleteProperty={handleDeleteProperty}
          />
          <BookingList bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

export default ApartmentOwnerDashboard;