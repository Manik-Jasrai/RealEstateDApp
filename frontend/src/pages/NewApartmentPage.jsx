import React, { useState } from 'react';
import axios from '../api/axios';
import FormApartment from '../components/FormApartment';
import { Loader2 } from 'lucide-react';

const DEFAULT_WALLET_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const NewApartmentPage = () => {
  const [formData, setFormData] = useState({
    address: DEFAULT_WALLET_ADDRESS,
    name: "Place",
    desc: "Very Beautiful",
    loc: "London", 
    images: "image",
    rooms: 2,
    price: 5
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/apartment', {...formData,owner : DEFAULT_WALLET_ADDRESS});
      console.log('Apartment submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting apartment:', error);
    } finally {
      setIsLoading(false);
      alert('Apartment added successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin">
            <Loader2 className="w-16 h-16 text-white" />
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="mt-2 text-lg text-gray-600">Share your space with travelers around the world</p>
        </div>
        <FormApartment 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewApartmentPage;