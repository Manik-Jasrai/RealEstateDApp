const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const ethers = require('ethers')

let contractInstance = null;

const initializeContract = async () => {
    if (contractInstance) {
        return contractInstance;
    }

    try {
        const networkName = hre.network.name;
        const deploymentPath = path.join(__dirname, `../deployments/${networkName}.json`);
        
        if (!fs.existsSync(deploymentPath)) {
            throw new Error('Deployment file not found. Please deploy the contract first.');
        }
        
        const deploymentData = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
        const contractAddress = deploymentData.address;
        
        const RealEstateDapp = await hre.ethers.getContractFactory("RealEstateDapp");
        contractInstance = await RealEstateDapp.attach(contractAddress);
        
        return contractInstance;
    } catch (error) {
        console.error('Error initializing contract:', error);
        throw error;
    }
};

// Initialize the contract when the module is first imported
const contractPromise = initializeContract();

module.exports = {
    // Get the initialized contract instance
    getContract: async () => {
        return await contractPromise;
    },
    
    // For uses where you need to ensure the contract is ready
    ensureInitialized: async () => {
        await contractPromise;
    },
    provider : new ethers.JsonRpcProvider('http://127.0.0.1:8545')

};