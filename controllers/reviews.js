
//all routes on this page are prefixed with localhost:3000/sun-surf-sea

//Require modules
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


//Require the db connection, and models
const db = require('../models')

// Routes
// Index Route  - All Reviews: 
// GET localhost:3000/
router.get('/', (req, res) => {
	db.BlogPost.find({}, { reviews: true,_id: false })
        .then(blogPosts => {
	    	const flatList = []
	    	for (let blogPost of blogPosts) {
	        	flatList.push(...blogPost.reviews)
	    	}
	    	res.render('reviews/review-index',
                { reviews: flatList }
            )
		}
	)
});

// New Route: GET localhost:3000/reviews/new
router.get('/new/:blogPostId', (req, res) => {
     db.BlogPost.findById(req.params.blogPostId)
        .then(blogPost => res.render('reviews/review-new', { blogPost: blogPost }))
});

// Create Route: POST localhost:3000/reviews/
router.post('/create/:blogPostId', (req, res) => {
    db.BlogPost.findByIdAndUpdate(
        req.params.blogPostId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(blogPost => res.redirect('/blogPosts/' + blogPost._id))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.BlogPost.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(blogPost => {
            res.render('reviews/review-detail',
            { review: blogPost.reviews[0] }
        )
        })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.BlogPost.findOneAndDelete(req.params.id)
        .then(() => res.redirect('/blogPosts/' + blogPost._id))
});


// Export these routes so that they are accessible in server.js
module.exports = router
