require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

const ethers = require('ethers');
const RealEstateDapp = require('./artifacts/contracts/RealEstateDapp.sol/RealEstateDapp.json');

// Setup provider and contract
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, RealEstateDapp.abi, provider);

// Helper function to get signer
const getSigner = async (req) => {
    if (!req.headers.authorization) {
        throw new Error('Authorization header required');
    }
    const privateKey = req.headers.authorization.split(' ')[1];
    return new ethers.Wallet(privateKey, provider);
};

// APARTMENT ROUTES
app.get('/apartments', async (req, res) => {
    try {
        const apartments = await contract.getApartments();
        res.json(apartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LIST of Routes
/*
GET APARTMENTS
-> by location
-> by owner
POST APARTMENT
PUT APARTMENT
DELETE APARTMENT

GET BOOKINGS
-> by each apartment of owner
-> by user
POST BOOKING

POST REVIEW
GET REVIEWS
-> by apartment 
*/



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
