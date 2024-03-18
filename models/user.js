const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
email : {
    type: String,
    required: true,
},
})

// username and password are automaticaaly defind by passportLocalMongoose

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);