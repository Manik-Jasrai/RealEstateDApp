import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Wallet,
  Zap,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";

const Landing = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const {address} = useAppKitAccount();

  const BlockchainBenefits = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-500" />,
      title: "Transparent Transactions",
      description:
        "Every transaction is recorded on the blockchain, ensuring complete transparency and reducing fraud risks.",
    },
    {
      icon: <Zap className="w-12 h-12 text-green-500" />,
      title: "Instant Settlements",
      description:
        "Smart contracts enable immediate, seamless property booking and payment processing without intermediaries.",
    },
    {
      icon: <Wallet className="w-12 h-12 text-purple-500" />,
      title: "Secure Digital Payments",
      description:
        "Pay securely using cryptocurrency with minimal transaction fees and enhanced security.",
    },
  ];

  const WalletConnectionSteps = [
    "Download MetaMask or WalletConnect",
    "Create or Import Your Wallet",
    "Connect Wallet to Our Platform",
    "Approve Transaction for Booking",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            ChainHome: Blockchain Real Estate
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience secure, transparent, and efficient property transactions
            powered by cutting-edge blockchain technology
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/apartments"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
              View Apartments
            </Link>
            <button
              onClick={() => setShowHelpModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center">
              <HelpCircle className="mr-2" /> How It Works
            </button>
            <Link
              to="/bookings"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
              View Bookings
            </Link>
            {address && address.toLowerCase() === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" ? (
            <Link
              to="/dashboard"
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              View Dashboard
            </Link>
            ) : null}
          </div>
        </div>

        {/* Blockchain Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {BlockchainBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Help Modal (Wallet Connection Guide) */}
        {showHelpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Wallet Connection Guide
              </h2>
              <div className="space-y-4 mb-6">
                {WalletConnectionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center">
                    <CheckCircle className="mr-3 text-green-500" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;