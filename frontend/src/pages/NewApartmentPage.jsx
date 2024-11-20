import React, { useState } from 'react';
import axios from '../api/axios';
import FormApartment from '../components/FormApartment';
import { Loader2 } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';

const NewApartmentPage = () => {
  const { address } = useAppKitAccount();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    owner: address || '', // Provide default empty string
    name: "",
    desc: "",
    loc: "", 
    images: "./a.jpg",
    rooms: '',
    price: ''
  });

  const handleSubmit = async (submittedData) => {
    if (!address) {
      setError('No wallet address found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Wait for the POST request to complete
      const response = await axios.post('/apartment', {
        ...submittedData,
        owner: address
      });

      if (response.data) {
        alert('Apartment added successfully');
        // Redirect to dashboard after successful creation
        navigate('/dashboard');
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      console.error('Error submitting apartment:', error);
      setError(error.response?.data?.message || 'Error creating apartment. Please try again.');
      alert('Error creating apartment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render form until we have an address
  if (!address) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading wallet details...</p>
        </div>
      </div>
    );
  }

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
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

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