import React from 'react'
import { Camera, Bed, Bath, Home, MapPin, DollarSign, Grid, Check } from 'lucide-react';

const FormApartment = ({formData, setFormData}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
          ...prev,
          amenities: {
            ...prev.amenities,
            [amenity]: !prev.amenities[amenity]
          }
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Property Photos
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 inline-flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photos
                  </button>
                  <p className="mt-2 text-sm text-gray-500">Upload high-quality images (max 10 photos)</p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Luxury Beachfront Apartment with Ocean View"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe what makes your property special..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  Property Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="condo">Condo</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Night
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size (sq ft)
                    </label>
                    <div className="relative">
                      <Grid className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the complete address"
                    required
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(formData.amenities).map(([amenity, checked]) => (
                    <button
                      key={amenity}
                      type="button"
                      className={`h-24 flex flex-col items-center justify-center gap-2 border rounded-lg transition-colors
                        ${checked 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      onClick={() => handleAmenityToggle(amenity)}
                    >
                      <span className="capitalize">{amenity}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  List Your Property
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default FormApartment