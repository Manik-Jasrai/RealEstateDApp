import React from 'react'
import { Link } from 'react-router-dom'
import ConnectButton from './ConnectButton';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ChainHome
        </Link>
        
        <ConnectButton/>
      </div>
    </nav>
  )
}

export default Navbar