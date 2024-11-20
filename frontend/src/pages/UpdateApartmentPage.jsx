import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormApartment from '../components/FormApartment';
import axios from '../api/axios';
import { useAppKitAccount } from '@reown/appkit/react';

const UpdateApartmentPage = () => {
  const {address} = useAppKitAccount();

  const [param,setParam] = useState(useParams());
  const [formData, setFormData] = useState({
    images: '',
    name: '',
    desc: '',
    loc: '',
    rooms: 0,
    price: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch apartment details when component mounts
  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/apartment/${param.apartmentId}`);
        const apt = response.data
        setFormData({
          images : apt.images,
          name : apt.name,
          desc : apt.description,
          loc : apt.location,
          rooms : apt.rooms,
          price : apt.price
        });
        console.log(formData);
      } catch (error) {
        console.error('Error fetching apartment details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [param.apartmentId]);

  // Handle form submission for updating apartment
  const handleUpdateApartment = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(`/apartment/${param.apartmentId}`,
         {...data, owner : address}
      );
      // Handle successful update (e.g., show success message, redirect)
      console.log('Apartment updated successfully', response.data);
      // Example: navigate to apartment details page
      // navigate(`/apartments/${id}`);
    } catch (error) {
      console.error('Error updating apartment:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching initial data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading apartment details...</p>
        </div>
      </div>
    );
  }

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
          onSubmit={handleUpdateApartment}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default UpdateApartmentPage;