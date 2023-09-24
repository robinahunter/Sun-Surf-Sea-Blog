const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewName: { type: String, required: true },
    reviewEmail: { type: String, required: true },
    reviewRating: { type: Number, min: 0, max: 5, default: 5 },
    reviewDescription: { type: String, required: true },
    reviewDate: { type: Date, default: Date.now }
    
});

module.exports = reviewSchema;