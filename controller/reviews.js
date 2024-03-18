const Listing = require("../models/Listing");
const Review = require("../models/review");
const ExpressError = require("../utility/ExpressError");

module.exports.createNewReview = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added"); 
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted"); 
    res.redirect(`/listings/${id}`);
};