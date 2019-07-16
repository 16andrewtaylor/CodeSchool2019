// imports
const express = require("express");
const expressSession = require("express-session"); // npm install express-session
// const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // npm install bcryptjs
const passport = require("passport"); // npm install passport
const LocalStrategy = require("passport-local").Strategy; // npm install passport-local

// Data
// var postsModel = require("./schema.js"); // no longer used here, only in its routes file
var userModel = require("./models/user.js");

// Setup Server
var server = express();
var port = process.env.PORT || 3000;

// Middleware
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get("origin"));
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
server.options("*", function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-type");
    next();
});
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// Passport Middleware
server.use(expressSession({
    secret: "Avatar is the best tv show ever",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000 // 1 hour
    }
}));
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});
passport.deserializeUser(function(id, callback) {
    userModel.findById(id, function(error, user) {
        callback(error, user);
    });
});
passport.use(new LocalStrategy(
    function(username, password, done) {
        userModel.findOne({
            username: username
        }, function(error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, function(error, isMatch) {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }
));

// Routers
var postsRouter = require("./routes/posts.js");
server.use("/posts", postsRouter);
var usersRouter = require("./routes/users.js");
server.use("/users", usersRouter);

mongoose.connect("mongodb+srv://LuTen16:16TenLu@firstcluster-x9et2.mongodb.net/registerauth?retryWrites=true&w=majority", {
    // /registerauth will specifiy which database it will connect to within the cluster
    useNewUrlParser: true
}).then(function() {
    server.listen(port, function() {
        console.log("Listening on " + port);
    });
});
