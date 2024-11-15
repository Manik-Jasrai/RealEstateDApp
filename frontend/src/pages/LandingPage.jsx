import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to our Real Estate App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover your perfect home with our comprehensive listing.
        </p>
        <Link to="/apartments" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded">
          View Apartments
        </Link>
      </div>
    </div>
  )
}

export default Landing