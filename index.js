var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');
const url = require('url'); 
const dotenv = require('dotenv');



dotenv.config();
var app = express();

// Routes
const home=require("./controllers/home");

//db connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true},
function(error){
    if (error){
        console.log("Error in connecting database: ",error);
    }else{
        console.log("Connected to the database");
    }
});



// Twitter Configuration for passport Login / Signin

passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
});

// Set view engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'twitsmadeeasy',
                  resave: true, 
                  saveUninitialized: true, 
                  store: new mongoStore({ url: process.env.DB_URL})
                }));
app.use(passport.initialize());
app.use(passport.session());


// URL Calls
app.get("/",(req,res)=>{
    res.render("index",{message: ""});
});


app.get('/twitter/auth', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/',
    message: 'Invalid username or password.' ,
}), function(req, res) {
    req.session.oauth_token = req.query.oauth_token;
    req.session.oauth_verifier = req.query.verifier;
    req.session.user = req.user._json.screen_name;
    req.session.photo = req.user._json.profile_image_url_https;
    res.redirect(url.format({
        pathname:"/home"
      })
      );
});



//start server
const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server running on port: ",port);    
});

//Register App
home(app);