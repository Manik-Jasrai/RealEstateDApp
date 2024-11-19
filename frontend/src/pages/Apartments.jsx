import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { RiSearchLine } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';
import ApartmentCard from '../components/ApartmentCard';

// Improved Loading Component
const LoadingSpinner = () => (
  <div className="col-span-full flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
  </div>
);

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
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch locations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const locationsResponse = await axios.get('/apartment/locations');
        let locationData = [];
        if (locationsResponse.data) {
          if (Array.isArray(locationsResponse.data)) {
            locationData = locationsResponse.data;
          } else if (locationsResponse.data.locations) {
            locationData = locationsResponse.data.locations;
          } else if (typeof locationsResponse.data === 'object') {
            locationData = Object.values(locationsResponse.data);
          }
        }
        const uniqueLocations = [...new Set(
          locationData.filter(loc => typeof loc === 'string')
        )];
        setLocations(uniqueLocations);
        if (uniqueLocations.length === 0) {
          console.warn('No locations found');
        }
      } catch (err) {
        console.error('Full Error:', err);
        
        const errorMessage = err.response 
          ? `Error: ${err.response.status} - ${err.response.statusText}`
          : 'Network error. Please check your connection.';
        
        setError(errorMessage);
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Fetch filtered apartments when location changes
  useEffect(() => {
    const fetchFilteredApartments = async () => {
      // Only fetch if a location is selected
      console.log(selectedLocation)
      if (!selectedLocation) {
        setFilteredApartments([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch apartments filtered by location
        const filteredResponse = await axios.get(`/apartment/location/${selectedLocation}`);

        // Ensure apartments is an array
        const apartmentData = Array.isArray(filteredResponse.data) 
          ? filteredResponse.data 
          : [];

        setFilteredApartments(apartmentData);
      } catch (err) {
        const errorMessage = err.response 
          ? `Error: ${err.response.status} - ${err.response.statusText}`
          : 'Network error. Please check your connection.';
        
        setError(errorMessage);
        setFilteredApartments([]);
        console.error('Error fetching filtered apartments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredApartments();
  }, [selectedLocation]);

  // Handle search functionality with optional filtering
  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Optional: Filter apartments based on search text
  const searchFilteredApartments = filteredApartments.filter(apartment => 
    apartment.name.toLowerCase().includes(searchText) || 
    apartment.location.toLowerCase().includes(searchText)
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <RiSearchLine className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search properties or location"
              value={searchText}
              onChange={handleSearch}
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
            {locations.map((location, index) => (
              <option 
                key={`${location}-${index}`} 
                value={location}
              >
                {location}
              </option>
            ))}
          </select>
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : !selectedLocation ? (
            <EmptyState message="Please select a location to view available apartments" />
          ) : searchFilteredApartments.length === 0 ? (
            <EmptyState message="No apartments available matching your search" />
          ) : (
            searchFilteredApartments.map(apartment => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentsPage;