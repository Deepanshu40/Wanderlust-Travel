if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
};

const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = require('./models/user.js');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utility/ExpressError.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const listingsRouter = require("./router/listing.js");
const reviewsRouter = require("./router/reviews.js");
const userRouter = require('./router/user.js');
const MongoStore = require('connect-mongo');
const wrapAsync = require('./utility/wrapAsync.js');
const listingController = require('./controller/listings.js');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(flash());

const store = MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      crypto: {
        secret: process.env.SECRET,
      },
      touchAfter: 24 * 3600 // time period in seconds
    });

store.on('error', () => {
    console.log('error in Mongo session');
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        http: true,
    },
}


app.use(passport.initialize());
app.use(session(sessionOptions));
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
res.locals.success = req.flash("success");
res.locals.failure = req.flash("failure");
res.locals.currUser = req.user;
res.locals.originalUrl = req.originalUrl;
console.log(res.locals.originalUrl);
next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/", userRouter);

app.get('/', (wrapAsync(listingController.Index)))
// starting the server
app.listen(port, ()=> {
    console.log(`server is listening to you on port ${8000} practice`);
});

// let {MONGO_USERNAME, MONGO_PASSWORD} = process.env;
let Mongo_Url = process.env.MONGODB_URI
// let Mongo_Url = `mongodb://127.0.0.1:27017/wanderlust`

// connecting to database
mongoose.connect(Mongo_Url)
.then(() => console.log('Connected!'))
.catch((err) => console.log(err));


// root route
app.get("*", (req,res) => {
    throw new ExpressError(404, "Page does not exists");
    });
    

app.use((err, req, res, next) => {
        let {status = 500, message = "something went wrong"} = err;
        res.status(status).render("err.ejs", {message});
});
