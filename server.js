//Require modules
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");


// Require the db connection, models, and seed data
const db = require('./models');

// Require routes in controllers folder
const blogPostsCtrl = require('./controllers/blogPosts')


// Create the Express app
const app = express();


// Configure the app to refresh the browser when nodemon restarts
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart and then refresh page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


// Configure the app/ app.set
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware/ app.use
app.use(express.static('public'))
app.use(connectLiveReload());


// Mount routes
app.get('/', function (req, res) {
    db.BlogPost.find({ featured: true })
        .then(blogPosts => {
            res.render('home', {
                blogPosts: blogPosts
            })
        })
});


// When a GET request is sent to `/seed`, the blogPosts collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing blogPosts
    db.BlogPost.deleteMany({})
        .then(removedBlogPosts => {
            console.log(`Removed ${removedBlogPosts.deletedCount} blogPosts`)
            // Seed the collection with the seed data
            db.BlogPost.insertMany(db.seedBlogPosts)
                .then(addedBlogPosts => {
                    console.log(`Added ${addedBlogPosts.length} new Blog Posts`)
                    res.json(addedBlogPosts)
                })
        })
});

// Tells app to look at controllers/blogPosts.js, to handle routes that begin with localhost:3000/sun-surf-sea
app.use('/blogPosts', blogPostsCtrl)


// App listening on specified port
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});

