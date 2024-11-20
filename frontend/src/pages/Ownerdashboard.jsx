import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { PlusCircle, Edit, Trash2, MapPin, DollarSign, Loader2 } from 'lucide-react';
import { useAppKitAccount } from '@reown/appkit/react';


const ApartmentOwnerDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {address} = useAppKitAccount();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApartments();
  }, [address]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/apartment/owner/${address}`);
      console.log(address, response.data);
      
      const formattedApartments = response.data.map(apt => ({
        id: apt.id.toString(),
        name: apt.name,
        description: apt.desc,
        location: apt.location,
        image: apt.images[0] || '/a.jpg',
        rooms: apt.rooms.toString(),
        price: apt.price,
        owner: apt.owner
      }));
      setApartments(formattedApartments);
      setError(null);
    } catch (err) {
      setError('Failed to fetch apartments. Please try again later.');
      console.error('Error fetching apartments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApartment = () => {
    navigate('/apartments/add');
  };

  const handleEditApartment = (apartment) => {
    navigate(`/apartments/${apartment.id}/update`);
  };

  const handleDeleteApartment = async (apartmentId) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      try {
        await axios.delete(`/apartment/${apartmentId}`);
        setApartments(apartments.filter(apt => apt.id !== apartmentId));
      } catch (err) {
        console.error('Error deleting apartment:', err);
        setError('Failed to delete apartment. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Apartment Owner Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your apartments and track your rentals
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Apartments</h2>
                <button 
                  onClick={handleAddApartment}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Apartment
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {apartments.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No apartments found. Add your first apartment to get started!
                  </div>
                ) : (
                  apartments.map(apartment => (
                    <div 
                      key={apartment.id} 
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={'./a.jpg'} 
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
                              <span className="inline-flex items-center text-gray-700">
                                ETH 
                                {apartment.price / 1e18}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleEditApartment(apartment)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteApartment(apartment.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentOwnerDashboard;