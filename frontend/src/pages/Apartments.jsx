import React, { Component, useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';
import ApartmentCard from '../components/ApartmentCard';

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
  
const locations = ['Kotalama', 'Kayu Tangan', 'Karangploso', 'Dinoyo', 'Mumbai'];

const EmptyState = ({ message }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
          <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
          </div>
          <p className="text-gray-600 text-lg">{message}</p>
      </div>
  </div>
);

const ApartmentsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filteredApartments, setFilteredApartments] = useState([]);

    useEffect(() => {
        setFilteredApartments(apartments.filter(apartment =>
            apartment.location.toLowerCase() === selectedLocation.toLowerCase()
        ))
    },[selectedLocation]);

    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <RiSearchLine className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search properties or location"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-md bg-white py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="ml-4 relative">
              <IoLocationSharp className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-64 rounded-md bg-white py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {!selectedLocation ? (
                <EmptyState message="Please select a location to view available apartments" />
            ) : filteredApartments.length === 0 ? (
                <EmptyState message="No apartments available in this location" />
            ) : (
                filteredApartments.map(apartment => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))
            )}
          </div>
        </div>
      </div>
    );
  };

export default ApartmentsPage;
