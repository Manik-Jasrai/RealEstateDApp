import React, { useState, useEffect } from 'react';
import FormApartment from '../components/FormApartment';

const UpdateApartmentPage = () => {
  const [formData, setFormData] = useState({
    id: "123",
    title: "Luxury Beachfront Apartment",
    description: "Beautiful 2-bedroom apartment with ocean views",
    price: "250",
    bedrooms: "2",
    bathrooms: "2",
    size: "1200",
    address: "123 Ocean Drive, Miami Beach, FL",
    propertyType: "apartment",
    amenities: {
      wifi: true,
      parking: true,
      pool: true,
      gym: false,
      ac: true,
      heating: true,
      laundry: true,
      security: true,
      pets: false,
      furnished: true
    },
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update Your Property</h1>
          <p className="mt-2 text-lg text-gray-600">Make changes to your property listing</p>
        </div>
        <FormApartment 
            formData={formData}
            setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default UpdateApartmentPage;