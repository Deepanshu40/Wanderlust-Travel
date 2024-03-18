const express = require("express");
const router = express.Router({mergeParams: true});
const asyncWrap = require("../utility/wrapAsync");
const ExpressError = require("../utility/ExpressError.js");
const {isLoggedIn, isReviewOwner, validateReview} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");


// adding reviews
router.post("/", isLoggedIn, validateReview ,asyncWrap(reviewController.createNewReview));
    
// Deleting a review from listing
router.delete("/:reviewId", isLoggedIn, isReviewOwner, asyncWrap(reviewController.destroyReview));

module.exports = router;