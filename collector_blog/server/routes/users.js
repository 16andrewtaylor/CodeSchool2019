const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

var userModel = require("../models/user.js");

var usersRouter = express.Router();

// Register
usersRouter.post("/register", function(req, res) {
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
usersRouter.post("/login",
    passport.authenticate("local", { failureRedirect: "/users/login/error" }),
    function(req, res, next) {
        res.redirect("/users/login/success");
    }
);

// Login error and success
usersRouter.get("/login/error", function(req, res) {
    res.status(403); // forbidden
    res.json({
        msg: "Invalid username or password"
    });
});

usersRouter.get("/login/success", function(req, res) {
    res.json({
        // msg: `Welcome ${req.user.username}`
        msg: "hello there"
    });
});

module.exports = usersRouter;
