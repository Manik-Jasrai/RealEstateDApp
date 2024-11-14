import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={'/a.jpg'} alt={apartment.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{apartment.name}</h3>
        <p className="text-gray-600 text-sm">{apartment.location}</p>
        <div className="flex items-center mt-2">
          <span className="text-gray-600 text-sm">{apartment.size}</span>
          <span className="text-gray-600 text-sm mx-2">|</span>
          <span className="text-gray-600 text-sm">{apartment.bedrooms} Bedrooms</span>
          <span className="text-gray-600 text-sm mx-2">|</span>
          <span className="text-gray-600 text-sm">{apartment.bathrooms} Bathrooms</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-500 font-medium">IDR {apartment.price.toLocaleString()}/yr</span>
          <Link 
            to={`/apartments/${apartment.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;