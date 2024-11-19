import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import ApartmentDetails from '../components/ApartmentPage/ApartmentDetails';

const ApartmentDetailsPage = () => {
  const [apartment, setApartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [param, setParam] = useState(useParams());
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        
        setIsLoading(true);
        // Fetch all apartments
        const response = await axios.get('/apartment');
        
        // Ensure we have an array
        const fetchedApartments = Array.isArray(response.data) 
          ? response.data 
          : response.data.apartments || [];
        // Find the specific apartment by ID
        const foundApartment = fetchedApartments.find(
          apt => apt.id == param.apartmentId
        );
        if (foundApartment) {
          setApartment(foundApartment);
        } else {
          setError('Apartment not found');
        }
      } catch (err) {
        console.error('Error fetching apartments:', err);
        setError(err.response?.data?.message || 'Failed to fetch apartments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-100 py-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {apartment ? (
          <ApartmentDetails apartment={apartment} />
        ) : (
          <div className="text-center text-gray-600 py-20">
            Apartment not found
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentDetailsPage;