const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const asyncWrap = require("../utility/wrapAsync");
const {listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/review.js")
const Listing = require("../models/Listing.js");
const ExpressError = require("../utility/ExpressError.js");
const {isLoggedIn, validateListing, isListingOwner, preLoginPath} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// render all listings and create listing route
router
.route("/")
.get(asyncWrap(listingController.Index))
.post(isLoggedIn, upload.single('listing[image]'), 
validateListing ,asyncWrap(listingController.createNewListing));

// create listing route
router.get("/new", isLoggedIn , listingController.renderNewForm);    

router.get("/category/:id", listingController.showCategoryList);

// renderlisting and edit route    
router
.route("/:id")
.get(preLoginPath, asyncWrap(listingController.showListing))
.patch(isLoggedIn, isListingOwner, upload.single('listing[image]'), asyncWrap(listingController.editListing));

//edit route
router.get("/edit/:id", isLoggedIn, isListingOwner, asyncWrap(listingController.renderingEditListing));
    
// destroy route
router.delete("/:id", isLoggedIn, isListingOwner, asyncWrap(listingController.destroyListing));


module.exports = router;