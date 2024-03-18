const User = require("../models/user");
const ExpressError = require("../utility/ExpressError");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.RedirectPostSignup = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
               return next(err);
            }
            req.flash("success", "Congratulation! You have signup up!")
            res.redirect("/listings"); 
            });
        }
    catch(e) {
        req.flash("failure", e.message);
        res.redirect("/signup");
        }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
    req.flash("success" , "Welcome to Wanderlust! you are successfully logged in");
    let redirectUrl = res.locals.redirectUrl || "listings"
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
           return next(err);
        }
        req.flash("success", "You have logged out successfully");
        res.redirect("/listings");
        })
};