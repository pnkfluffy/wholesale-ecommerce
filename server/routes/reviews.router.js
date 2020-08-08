const express = require('express')
const router = express.Router()
const async = require('async')
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const Review = require('../schemas/reviewSchema')

// @route   GET /reviews/all/:page_size/:page_num
// @:page_size size of return
// @:page_num number of return
// @desc    Returns page_size reviews of page_number
// @access  Private
router.get('/all', rejectUnauthenticated, (req, res) => {
    Review.find({ deleted: false }, { user: 0, deleted: 0 }).sort({ date: -1 })
        .then(reviews => {
            res.json(reviews)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('no reviews found')
        })
})

// @route   GET /reviews/oneReview/:reviewId
// @desc    Returns the specified review
// @access  Private
// router.get('/oneReview/:reviewId', (req, res) => {
//     Order.findById(req.params.reviewId, { user: 0})
//         .then(review => res.json(review))
//         .catch(error => {
//             console.log(error)
//             res.status(500).send('review not found')
//         })
// })

// @route   GET /reviews/from/
// @desc    Returns page_size reviews of page_number from user
// @:page_size size of return
// @:page_num number of return
// @access  Private
router.get('/from/:page_size/:page_num', rejectUnauthenticated, (req, res) => {
    const skips = req.params.page_size * (req.params.page_num - 1)

    Review.find({ user: req.user._id, deleted: false }, { user: 0, deleted: 0 })
        .skip(skips)
        .limit(parseInt(req.params.page_size, 10))
        .then(reviews => {
            res.json(reviews)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error finding reviews from this id')
        })
})

// @route   POST /reviews/newReview/
// @desc    Returns a new Review for the selected product
// @req     {review: string, starts: number 1-5}
// @access  Private
router.post('/newReview/:productID', rejectUnauthenticated, async (req, res) => {
    try {
        const userID = req.user._id
        const userName = req.user.name.split(' ')
        const product = req.params.productID
        const review = req.body.review
        const stars = req.body.stars

        const verify = review.split(' ')
        const invalid = verify.filter(word => word.length > 30)
        if (invalid.length > 0) {
            res.status(415).send('your review contains invalid words')
            return
        }

        await Review.updateMany({ user: userID, product: product }, {deleted: true})

        const newReview = new Review({
            user: userID,
            userName: userName[0],
            product: product,
            review: review,
            stars: stars
        })
        newReview
            .save()
            .then(review => {
                res.redirect('/api/reviews/all')
            })
            .catch(err => {
                console.log(err)
                res.status(500).send('error creating review')
            })
    } catch (error) {
        console.log(error);
        res.status(500).send('error creating review')
    }
})

// @route   POST /reviews/editReview/:reviewID
// @req     {review: string, stars: number 1-5}
// @desc    Returns review with changed fields
// @access  Private
router.post('/editReview/:reviewID', rejectUnauthenticated, (req, res) => {
    const newReview = req.body.review;
    const newStars = req.body.stars;
    Review.find({ _id: req.params.reviewID, user: req.user._id})
        .then(review => {
            review.updateOne({ review: newReview, stars: newStars })
                .then(review => res.json(review))
                .catch(error => {
                    console.log(error)
                    res.status(500).send("Couldn't edit review")
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(`Couldn't edit review`)
        })
})

// @route   DELETE /reviews/:reviewID
// @desc    Delete a Review
// @access  Private
router.delete('/:reviewID', rejectUnauthenticated, (req, res) => {
    Review.findOneAndUpdate({ _id: req.params.reviewID, user: req.user._id }, { deleted: true })
        .then(() => res.json({ success: true }))
        .catch(err => {
            console.log(err)
            res.status(500).json("Can't delete review")
        })
})

// @route   DELETE /reviews/deleteAllReviewsFromUser
// @desc    Deletes all the reviews made by active user
// @access  Private
// router.delete('/deleteAllReviewsFromUser', (req, res) => {
//     Order.find({user: req.user._id})
//         .then(reviews => reviews.remove().then(() => res.json({ success: true })))
//         .catch(error => {
//             console.log(error)
//             res.status(500).send("Couldn't delete reviews")
//         })
// })

module.exports = router
