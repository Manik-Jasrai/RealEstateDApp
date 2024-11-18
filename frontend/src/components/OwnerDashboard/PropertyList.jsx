import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const PropertyList = ({ properties, onAddProperty, onEditProperty, onDeleteProperty }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
        <button 
          onClick={onAddProperty}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusCircle className="mr-2" /> Add Property
        </button>
      </div>
      <div className="space-y-4">
        {properties.map(property => (
          <div 
            key={property.id} 
            className="flex items-center justify-between border-b pb-4 last:border-b-0"
          >
            <div className="flex items-center">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-16 h-16 rounded-md mr-4 object-cover" 
              />
              <div>
                <h3 className="font-semibold text-gray-900">{property.name}</h3>
                <p className="text-gray-600">{property.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onEditProperty(property)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDeleteProperty(property.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;