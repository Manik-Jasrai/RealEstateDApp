import React, { useState } from 'react';
import FormApartment from '../components/FormApartment';


const NewApartmentPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    address: '',
    propertyType: 'apartment',
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      gym: false,
      ac: false,
      heating: false,
      laundry: false,
      security: false,
      pets: false,
      furnished: false
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="mt-2 text-lg text-gray-600">Share your space with travelers around the world</p>
        </div>
        <FormApartment 
            formData={formData}
            setFormData={setFormData}
        />
        
      </div>
    </div>
  );
};

export default NewApartmentPage;