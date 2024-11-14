import React from 'react';
import { useParams } from 'react-router-dom';
import ApartmentDetails from '../components/ApartmentPage/ApartmentDetails';

const apartments = [
  {
    id: 1,
    name: 'Bukit Batu Indah Permai',
    location: 'Kotalama',
    size: '100m²',
    bedrooms: 2,
    bathrooms: 1,
    price: 2000000000,
    image: '/bukit-batu-indah.jpg'
  },
  {
      id: 7,
      name: 'Bukit Batu Indah Permai',
      location: 'Kotalama',
      size: '100m²',
      bedrooms: 2,
      bathrooms: 1,
      price: 2000000000,
      image: '/bukit-batu-indah.jpg'
    },
    {
      id: 8,
      name: 'Bukit Batu Indah Permai',
      location: 'Kotalama',
      size: '100m²',
      bedrooms: 2,
      bathrooms: 1,
      price: 2000000000,
      image: '/bukit-batu-indah.jpg'
    },
    {
      id: 9,
      name: 'Bukit Batu Indah Permai',
      location: 'Kotalama',
      size: '100m²',
      bedrooms: 2,
      bathrooms: 1,
      price: 2000000000,
      image: '/bukit-batu-indah.jpg'
    },
  {
    id: 2,
    name: 'Starki Industrial Master Building',
    location: 'Kayu Tangan',
    size: '70m²',
    bedrooms: 3,
    bathrooms: 3,
    price: 420000000,
    image: '/starki-industrial.jpg'
  },
  {
    id: 3,
    name: 'Luxury Residence Universe',
    location: 'Karangploso',
    size: '60m²',
    bedrooms: 3,
    bathrooms: 2,
    price: 220000000,
    image: '/luxury-residence.jpg'
  },
  {
    id: 4,
    name: 'The Most Real Estate Murah',
    location: 'Dinoyo',
    size: '85m²',
    bedrooms: 4,
    bathrooms: 2,
    price: 120000000,
    image: '/the-most-real-estate.jpg'
  }
];

const ApartmentDetailsPage = () => {
  const { apartmentId } = useParams();
  const apartment = apartments.find(a => a.id === parseInt(apartmentId));

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