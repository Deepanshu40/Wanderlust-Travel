const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
})

module.exports = mongoose.model("Review", reviewSchema);
