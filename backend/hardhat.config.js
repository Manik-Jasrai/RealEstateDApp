// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// Add your private key and API keys to a .env file
// PRIVATE_KEY=your_private_key_here
// ALCHEMY_API_KEY=your_alchemy_api_key_here
// ETHERSCAN_API_KEY=your_etherscan_api_key_here (optional, for verification)

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    }
  },
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}