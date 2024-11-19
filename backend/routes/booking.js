const express = require('express');
const router = express.Router();
const { getContract, provider } = require('../config/contractConfig');

// Utility function to format booking
const formatBooking = (booking) => ({
    id: Number(booking.id),
    apartmentId: Number(booking.aptid),
    tenant: booking.tenant,
    price: Number(booking.price),
    total: Number(booking.total),
    checkInDate: new Date(Number(booking.checkInDate) * 1000).toISOString(),
    checkOutDate: new Date(Number(booking.checkOutDate) * 1000).toISOString(),
    numGuests: Number(booking.numGuests),
    checkedIn: booking.checkedIn,
    checkedOut: booking.checkedOut
});

const getAllBookings = async (contract) => {
    const bookings = await contract.getAllBookings();
    return bookings.map(formatBooking);
}

// Get bookings for a specific apartment
router.get('/:aptid', async (req, res) => {
    try {
        const contract = await getContract();
        const aptid = Number(req.params.aptid);
        const bookings = await contract.getBookings(aptid);
        res.json(bookings.map(formatBooking));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bookings for a specific tenant
router.get('/user/:address', async (req, res) => {
    try {
        const contract = await getContract();
        const tenantAddress = req.params.address.toLowerCase();
        const bookings = await getAllBookings(contract);
        const filteredBookings = bookings.filter(book => 
            book.tenant.toLowerCase() === tenantAddress
        );
        res.json(filteredBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get unavailable dates for an apartment
router.get('/unavl/:aptid', async (req, res) => {
    try {
        const contract = await getContract();
        const aptid = Number(req.params.aptid);
        const unavailableDates = await contract.getUnavailableDates(aptid);
        res.json(unavailableDates.map(date => new Date(Number(date) * 1000).toISOString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check if tenant has booked a specific apartment
router.get('/has-booked/:aptid/:address', async (req, res) => {
    try {
        const contract = await getContract();
        const aptid = Number(req.params.aptid);
        const address = req.params.address;
        const signer = await provider.getSigner(address);
        const hasBooked = await contract.connect(signer).tenantBooked(aptid);
        res.json({ hasBooked });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { 
            address, 
            aptid, 
            checkInDate, 
            checkOutDate, 
            numGuests 
        } = req.body;

        // Validate input
        if (!address || !aptid || !checkInDate || !checkOutDate || !numGuests) {
            return res.status(400).json({ error: 'Missing required booking parameters' });
        }

        // Convert dates to timestamps
        const checkInTimestamp = Math.floor(new Date(checkInDate).getTime() / 1000);
        const checkOutTimestamp = Math.floor(new Date(checkOutDate).getTime() / 1000);

        // Validate timestamps
        if (isNaN(checkInTimestamp) || isNaN(checkOutTimestamp)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const signer = await provider.getSigner(address);
        
        // Calculate required payment
        const contract = await getContract();
        const numNights = Math.max(0, Math.floor((checkOutTimestamp - checkInTimestamp) / 86400));
        console.log(numNights);
        
        
        if (numNights === 0) {
            return res.status(400).json({ error: 'Invalid booking duration' });
        }

        const price = await contract.calculatePrice(aptid, numNights);

        const tx = await contract.connect(signer).bookApt(
            aptid, 
            checkInTimestamp, 
            checkOutTimestamp, 
            numGuests,
            { value: price }
        );
        
        await tx.wait();

        res.status(201).json({ 
            message: 'Booking created successfully', 
            transactionHash: tx.hash 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;