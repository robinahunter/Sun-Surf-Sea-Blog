// Require Mongoose package
const mongoose = require('mongoose');

// Schema to define the properties of blog posts
const blogPostSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    headline: { type: String, required: true },
    article: { type: String, required: true },
    topic: { type: String, enum: ['Travel', 'Living', 'Surfing', 'Paddling', 'Snorkeling', 'Wind', 'Swimming'], required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    datePublished: { type: Date, default: Date.now }
});

// Export schema as a Monogoose model that will be accessed in models/index.js
module.exports = mongoose.model('BlogPost', blogPostSchema);
