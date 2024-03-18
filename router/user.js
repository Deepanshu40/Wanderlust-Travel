const express = require("express");
const router = express.Router({mergeParams: true});  // to access parent route query strings and id's, 
const User = require('../models/user.js');
const ExpressError = require("../utility/ExpressError.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/users.js");


// signUp and post signup Redirect route
router
.route("/signup")
.get(userController.renderSignupForm)
.post(userController.RedirectPostSignup);


// renderLoginForm and PostLogin Route 
router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",
{failureRedirect: "/login", failureFlash: true}), userController.login);

// logout
router.get("/logout", isLoggedIn, userController.logout);
    
module.exports = router;