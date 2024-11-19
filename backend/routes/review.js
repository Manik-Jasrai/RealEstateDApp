const express = require('express');
const router = express.Router();
const { getContract, provider } = require('../config/contractConfig');

// Utility function to format review
const formatReview = (review) => ({
    id: Number(review.id),
    apartmentId: Number(review.aptid),
    text: review.text,
    rating: Number(review.rating),
    timestamp: new Date(Number(review.timestamp) * 1000).toISOString(),
    reviewer: review.reviewer
});

// Utility function to format rating
const formatRating = (rawRating) => {
    // Explicitly convert BigInt to Number
    const normalizedRating = Number(rawRating) / 100;
    return {
        value: normalizedRating,
        percentage: Math.round((normalizedRating / 5) * 100),
        displayText: `${normalizedRating.toFixed(1)} / 5.0`
    };
};

// Get reviews for a specific apartment
router.get('/:aptid', async (req, res) => {
    try {
        const contract = await getContract();
        const aptid = Number(req.params.aptid);
        const reviews = await contract.getReviews(aptid);
        res.json(reviews.map(formatReview));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get average rating for an apartment
router.get('/rating/:aptid', async (req, res) => {
    try {
        const contract = await getContract();
        const aptid = Number(req.params.aptid);
        const rawRating = await contract.getAverageRating(aptid);
        res.json(formatRating(rawRating));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a review
router.post('/:aptid', async (req, res) => {
    try {
        const contract = await getContract();
        const {address ,text, rating } = req.body;
        const aptid = Number(req.params.aptid);

        const signer = await provider.getSigner(address);
        const tx = await contract.connect(signer).addReview(aptid, text, rating);
        await tx.wait();

        res.status(201).json({ message: 'Review added successfully', transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;