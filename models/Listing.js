const mongoose = require("mongoose");
const Review = require("./review.js");
const { string } = require("joi");
const {Schema} = mongoose;

const listingSchema = new mongoose.Schema({
    title : {   
        type: String,
        required: true
    },
    description : {
        type: String,

    }, image: {
        url: String,
        filename: String,
    }, price: {
       type: Number,

    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Review' 
        }
    ],
    category: {
        type: String,
        // enum: ['Pools', 'Hotels', 'Mountains', 'Houseboat', 'Beach', 'Golf', 'Domes', 'Restaurant', 'Playstation', 'Skiing'],
        // required: true,
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
        }
    });

    listingSchema.post("findOneAndDelete", async (listing) => {
        if  (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
        }}
    );
        
    const Listing = mongoose.model("Listing",listingSchema);

    module.exports = Listing;

