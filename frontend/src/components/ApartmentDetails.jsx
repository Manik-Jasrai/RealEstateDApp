import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';


const ApartmentDetails = ({ apartment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={apartment.image} alt={apartment.name} className="w-full h-72 object-cover" />
        <div className="absolute top-4 left-4 bg-white rounded-md px-3 py-1 text-sm font-medium text-gray-800">
          IDR {apartment.price.toLocaleString()}/yr
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{apartment.name}</h2>
        <div className="flex items-center text-gray-600 mb-4">
          <IoLocationSharp className="mr-2" />
          <span>{apartment.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <FaBed className="mr-2" />
          <span>{apartment.bedrooms} Bedrooms</span>
          <span className="mx-2">|</span>
          <FaBath className="mr-2" />
          <span>{apartment.bathrooms} Bathrooms</span>
        </div>
        <p className="text-gray-700 mb-6">{apartment.description}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md">
          Book Apartment
        </button>
      </div>
    </div>
  );
};

export default ApartmentDetails;