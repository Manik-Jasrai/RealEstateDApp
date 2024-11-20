import React from 'react';
import { PlusCircle, Edit, Trash2, MapPin, DollarSign } from 'lucide-react';

const ApartmentList = ({ apartments, onAddApartment, onEditApartment, onDeleteApartment }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Apartments</h2>
          <button 
            onClick={onAddApartment}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Apartment
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {apartments.map(apartment => (
          <div 
            key={apartment.id} 
            className="p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={apartment.image} 
                  alt={apartment.name} 
                  className="w-24 h-24 rounded-lg object-cover shadow-md" 
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {apartment.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {apartment.location}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${apartment.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {apartment.status}
                    </span>
                    <span className="inline-flex items-center text-gray-700">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {apartment.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onEditApartment(apartment)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDeleteApartment(apartment.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentList;