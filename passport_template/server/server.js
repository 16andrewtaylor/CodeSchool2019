const express = require("express");
const expressSession = require("express-session"); // npm install express-session
// const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // npm install bcryptjs
const passport = require("passport"); // npm install passport
const LocalStrategy = require("passport-local").Strategy; // npm install passport-local

var server = express();
var PORT = process.env.PORT || 3000;

// Middleware
// server.use(cors({
//     credentials: true
// }));
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
var ensureAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403); // Forbidden
        res.json({
            msg: "Please login first"
        });
    }
};

// Models
var userModel = require("./models/user.js");

// Endpoints
server.get("/private", ensureAuthentication, function(req, res) {
    res.json({
        msg: `Hello ${req.user.username}`
    });
});

// Register
server.post("/users/register", function(req, res) {
    userModel.findOne({
        username: req.body.username
    }).then(function(user) {
        if (user) {
            res.status(422); // unprocessable
            res.json({
                msg: "That username is already in use."
            });
        } else {
            // Create the user, but first encrypt the password
            bcrypt.genSalt(10, function(error, salt) {
                bcrypt.hash(req.body.password, salt, function(error, hashed_password) {
                    userModel.create({
                        username: req.body.username,
                        password: hashed_password
                    }).then(function(new_user) {
                        res.status(201);
                        res.json({
                            user: new_user
                        });
                    }).catch(function(error) {
                        res.status(400).json({msg: error.message});
                    });
                });
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

// Login
server.post("/users/login",
    passport.authenticate("local", { failureRedirect: "/users/login/error" }),
    function(req, res, next) {
        res.redirect("/users/login/success");
    }
);

// Login error and success
server.get("/users/login/error", function(req, res) {
    res.status(403); // forbidden
    res.json({
        msg: "Invalid username or password"
    });
});

server.get("/users/login/success", function(req, res) {
    res.json({
        msg: `Welcome ${req.user.username}`
    });
});

// Connect to database and start the server
mongoose.connect("mongodb+srv://LuTen16:16TenLu@firstcluster-x9et2.mongodb.net/registerauth?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(function() {
    server.listen(PORT, function() {
        console.log(`Listening on port ${PORT}`);
    });
});
