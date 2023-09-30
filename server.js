//Require modules
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');



// Require the db connection, models, and seed data
const db = require('./models');

// Require routes in controllers folder
const blogPostsCtrl = require('./controllers/blogPosts')
const reviewsCtrl = require('./controllers/reviews')


// Create the Express app
const app = express();

// Detect if running in a dev environment REFACTOR FOR DEPLOY ON HEROKU
if (process.env.ON_HEROKU === 'false') {
    // Configure the app to refresh the browser when nodemon restarts
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        // wait for nodemon to fully restart before refreshing the page
        setTimeout(() => {
        liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));


// // Configure the app to refresh the browser when nodemon restarts during DEV
// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//     // wait for nodemon to fully restart and then refresh page
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });


// Configure the app/ app.set
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'blogPosts'),
    path.join(__dirname, 'views', 'reviews'),
]);


// Middleware/ app.use
app.use(express.static('public'))
// //THIS IS FOR DEV
// app.use(connectLiveReload());
//Body parser for POST PUT PATCH
app.use(express.urlencoded({ extended: true }));
//POST request override to DELETE PUT PATCH
app.use(methodOverride('_method'));


// Mount routes
// LandingPage route
app.get('/', function (req, res) {
            res.render('index') 
});

// Home route
app.get('/home', function (req, res) {
    db.BlogPost.find({ featured: true })
        .then(blogPosts => {
            res.render('home', {
                blogPosts: blogPosts
            })
        })
});

//About route
app.get('/about', function (req, res) {
    res.render('about')
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

// Tells app to look at controllers/blogPosts.js, to handle routes that begin with localhost:3000/blogPosts
app.use('/blogPosts', blogPostsCtrl)


//look at controller file for routes that begin with /reviews
app.use('/reviews', reviewsCtrl)

// Catch-all route for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});

// App listening on specified port
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});

