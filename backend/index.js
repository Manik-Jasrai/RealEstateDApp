require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
const { ensureInitialized } = require('./config/contractConfig')
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

// APARTMENT ROUTES
app.use('/apartment', require('./routes/apartment'));
app.use('/review', require('./routes/review'));
app.use('/booking', require('./routes/booking'));
// LIST of Routes
/*
GET BOOKINGS
-> by each apartment of owner
-> by user
POST BOOKING

*/


const startServer = async () => {
    try {
        await ensureInitialized();
        console.log('Smart contract initialized successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
};

startServer();