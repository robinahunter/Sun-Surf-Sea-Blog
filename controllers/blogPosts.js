
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
            res.render('blogPost-index', {
                blogPosts: blogPosts
            })
        })
})

// New route - GET/Read. This route renders a new form
router.get('/new', (req, res) => {
    res.send("You have connected to the NEW Route")
})

//Create route POST/Create This route recieves the POST request
//sent from new route and creates new document the redirects to the blogs show page
router.post('/', (req, res) => {
    db.BlogPost.create(req.body)
    .then(blogPost => res.json(blogPost))
})

// Show Route /GET/Read  - Will display an individual blog document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.BlogPost.findById(req.params.id)
        .then(blogPost => {
            res.render('blog-detail', {
                blogPost: blogPost
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

//Edit route
router.get('/:id/edit',(req, res) => {
    db.BlogPost.findById(req.params.id)
    .then(blogPost => res.send("You'll be editing blog " + blogPost._id))
});

//Update route PUT/Update this route recieves the put request sent from the edit route
//this update route edits the document andredirect to the updated blog post show page
router.put('/:id', (req, res) => {
    db.BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(blogPost => res.json(blogPost))
});

//Destroy route
router.delete('/:id', (req, res) => {
    db.BlogPost.findByIdAndRemove(req.params.id)
    .then(blogPost => res.send("You have deleted the blog post"))
});

// Export routes so that they are accessible in server.js
module.exports = router
 