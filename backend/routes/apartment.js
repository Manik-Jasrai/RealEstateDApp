const express = require('express');
const { getContract , provider} = require('../config/contractConfig');
const router = express();

const formatApartment = (apt) => ({
    id: apt.id.toString(),
    name: apt.name,
    description: apt.desc,
    location: apt.loc,
    images: apt.images,
    rooms: apt.rooms.toString(),
    price: apt.price.toString(),
    owner: apt.owner,
    booked: apt.booked,
    deleted: apt.deleted,
    timestamp: apt.timestamp.toString()
});

const getAllApartments = async (contract) => {
    const apartments = await contract.getApartments();
    return apartments.map(formatApartment)
}

// GET all apartments
router.get('/', async (req, res) => {
    const contract = await getContract();
    const apartments = await getAllApartments(contract);
    res.json(apartments);
});
// GET all locations
router.get('/locations', async (req, res) => {
    const contract = await getContract();
    const apartments = await getAllApartments(contract);
    const locations = apartments.map(apartment => apartment.location);
    res.json(locations);
});

// GET apartment by ID
router.get('/:id', async (req, res) => {
    try {
        const contract = await getContract();
        const apartments = await getAllApartments(contract);

        const apartment = apartments.find(apt => apt.id.localeCompare(req.params.id) === 0);

        if (apartment) {
            res.json(apartment); // Send the single matched apartment
        } else {
            res.status(404).send({ error: 'Apartment not found' }); // Handle not found case
        }
    } catch (error) {
        console.error('Error fetching apartment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// GET apartments by owner
router.get('/owner/:address', async (req, res) => {
    const contract = await getContract();
    const apartments = await getAllApartments(contract);
    console.log(apartments)
    const filteredApartments = apartments.filter(apt => 
        apt.owner.toLowerCase() === req.params.address.toLowerCase()
    );
    res.json(filteredApartments);
});

// GET apartments by location
router.get('/location/:location', async (req, res) => {
    const contract = await getContract();
    const apartments = await getAllApartments(contract);
    const filteredApartments = apartments.filter(apt => 
        apt.location.toLowerCase().includes(req.params.location.toLowerCase())
    );
    res.json(filteredApartments);
});

// POST apartment
router.post('/', async (req, res) => {
    const { name, desc, loc, images, rooms, price, owner} = req.body;
    if (!name || !desc || !loc || !images || !rooms || !price) res.status(400).json({ message : "Invalid Body" });

    const contract = await getContract();

    const signer = await provider.getSigner(owner);
    const tx = await contract.connect(signer).createApartment(
        name,
        desc,
        loc,
        images,
        rooms,
        price
    );
    const response = await tx.wait();
    res.json({
        message: 'Apartment added successfully', 
        transactionHash: response.transactionHash 
    });
});

// PUT Apartment
router.put('/:id', async (req, res) => {
    try {

    
    const {id} = req.params;
    const { name, desc, loc, images, rooms, price, owner } = req.body;
    if (!id || !name || !desc || !loc || !images || !rooms || !price) res.status(400).json({ message : "Invalid Body" });

    const contract = await getContract();
    const signer = await provider.getSigner(owner);
    const tx = await contract.connect(signer).updateApartment(
        id,
        name,
        desc,
        loc,
        images,
        rooms,
        price
    );
    const response = await tx.wait();
    res.json({ 
        message: 'Apartment updated successfully', 
        transactionHash: response.transactionHash 
    });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req?.params?.id;
    const contract = await getContract();
    const tx = await contract.deleteApartment(id);
    const response = await tx.wait();
    res.json({ 
        message: 'Apartment deleted successfully', 
        transactionHash: response.transactionHash 
    });
})

module.exports = router;
