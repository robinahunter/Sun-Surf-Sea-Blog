//NOTE: All routes on this page are prefixed with localhost:3000/sun-surf-sea

//Require modules
const express = require('express')
const router = express.Router()

// Require db connection & models
const db = require('../models')

// Routes

// Index Route /GET/Read  - Will display all Blog Posts
router.get('/', function (req, res) {
    db.BlogPost.find({})
        .then(blogPosts => {
            res.render('blogPosts/blogPost-index', {
                blogPosts: blogPosts
            })
        })
});

// New route - GET/Read. This route renders a new form
router.get('/new', (req, res) => {
    res.render('blogPosts/blog-new')
});

//Create route POST/Create This route recieves the POST request
//sent from new route and creates new document the redirects to the blogs show page
router.post('/', (req, res) => {
    console.log(req.body)
    db.BlogPost.create(req.body)
    .then(blogPost => res.redirect('/blogPosts/'))
});

// Show Route /GET/Read  - Will display an individual blog document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.BlogPost.findById(req.params.id)
        .then(blogPost => {
            res.render('blogPosts/blog-detail', {
                blogPost: blogPost
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
});

//Edit route
router.get('/:id/edit',(req, res) => {
    db.BlogPost.findById(req.params.id)
    .then(blogPost => res.render('blogPosts/blog-edit', { blogPost: blogPost }))
});

//Update route PUT/Update this route recieves the put request sent from the edit route
//this update route edits the document andredirect to the updated blog post show page
router.put('/:id', (req, res) => {
    db.BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(blogPost => res.redirect('/blogPosts/' + blogPost._id))
});

//ChatGBT helped resolve issues on this route:
// Search page route - will return blog posts that match search query
router.post('/search', (req, res) => {
    const searchQuery = req.body.search;

    // Use a regular expression to perform a case-insensitive search
    const searchRegex = new RegExp(searchQuery, 'i');

        //modify the MongoDB query to find blog posts that match either the title or the content field using the $or operator.
    db.BlogPost.find({ $or: [{ topic: searchRegex }, { headline: searchRegex }, { article: searchRegex }] })
        .then(blogPosts => {
            res.render('blogPosts/search', {
                blogPosts: blogPosts,
                search: searchQuery // Send the search query back to the view for display
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


//Destroy route
router.delete('/:id', (req, res) => {
    db.BlogPost.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/blogPosts/'))
});

// Export routes so that they are accessible in server.js
module.exports = router
 