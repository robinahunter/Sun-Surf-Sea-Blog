// Require the Mongoose package & env. configuration
const mongoose = require('mongoose');
require('dotenv').config()

// Connect to MongoDB Atlas for sun-surf-sea
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

module.exports = {
    BlogPost: require('./blogPost')
}
