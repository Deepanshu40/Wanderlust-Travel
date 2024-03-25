const Listing = require("../models/Listing");
const mongoose = require("mongoose");
const ExpressError = require("../utility/ExpressError");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.Index = async (req,res,next) => {
    let listings = await Listing.find();
    res.render("listings/show.ejs", {listings});
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/add.ejs")
};

module.exports.createNewListing = async (req,res, next) => {
    let {path: url, filename} = req.file;
    let addListing = req.body.listing;
    let location = addListing.location;

let response = await geoCodingClient.forwardGeocode({
    query: location,
    limit: 1,
    })
    .send()
    
    addListing.image = {url, filename};
    addListing.geometry = response.body.features[0].geometry
    const newListing = new Listing(addListing);
    newListing.owner = req.user._id;
    await newListing.save()
    req.flash("success", "Listing created successfully"); 
    res.redirect(`/listings`);
};

module.exports.showListing = async (req,res,next) => {
    let {id} = req.params;
    // let listing = await Listing.findById(id).populate("reviews").populate("owner");
    let listing = await Listing.findById(id).populate({path: "reviews", populate: {path : "author"}}).populate("owner");
        if (!listing) {
            req.flash("failure", "The Listing you are trying to access is not available");
            res.redirect("/listings");
        };
        res.render("listings/listing.ejs", {listing});
};

module.exports.renderingEditListing = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("failure", "The Listing you are trying to edit is not available");
        res.redirect("/listings/edit");
    };
    let imageUrl = listing.image.url;
        imageUrl = imageUrl.replace("/upload", "/upload/h_300,w_300");
        res.render(`listings/edit.ejs`, {listing, imageUrl});
};

module.exports.editListing = async (req, res, next) => {
    let {id} = req.params;
    let updatedListing = req.body.listing;
    if (req.file) {
        console.log('entered here');
    let {path: url, filename} = req.file;
        updatedListing.image = {url, filename}
    };
    console.log(updatedListing);
    await Listing.findByIdAndUpdate(id, {$set: updatedListing}, {runValidators:true});
    req.flash("failure", "Listing has been updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res, next) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id);  
    req.flash("success", "Listing Deleted"); 
    res.redirect(`/listings`);   
};


module.exports.showCategoryList = async (req,res, next) => {
    let {id} = req.params;
    let listings = await Listing.find({category: id});
    res.render("listings/show.ejs", {listings});
};