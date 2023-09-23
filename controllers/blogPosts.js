
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


// Export routes so that they are accessible in server.js

module.exports = router
