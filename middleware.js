const Listing = require("./models/Listing.js");
const Review = require("./models/review.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utility/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("failure", "Please sign in to continue");
        res.redirect("/login");
    }
    else {
        next();
    }
};


module.exports.preLoginPath = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (!(req.originalUrl === "/login")) {
            req.session.redirectUrl = req.originalUrl;
            next();
        } else {
            next();
        }
    }
    else {
        next();
    }
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }    
    next();
};


module.exports.isListingOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if( !req.user._id.equals(listing.owner._id)) {
    req.flash("failure", "You should be owner of listing for updation");  
    return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId).populate("author");
    if( !req.user._id.equals(review.author._id)) {
    req.flash("failure", "You must be author of review for deletion");  
    return res.redirect(`/listings/${id}`);
    }
    next();
}


// validateListing middleware

module.exports.validateListing = function (req, res, next) {
    let result = listingSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    } else {
        next();
    }
}


module.exports.validateReview = function (req, res, next) {
    let result = reviewSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(404, result.error);
    } else {
        next();
    }
}