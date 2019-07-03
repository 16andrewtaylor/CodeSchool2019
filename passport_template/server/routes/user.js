const express = require("express");

var userRouter = express.Router();

// Register
userRouter.post("/register", function(req, res) {
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
userRouter.post("/login",
    passport.authenticate("local", { failureRedirect: "/users/login/error" }),
    function(req, res, next) {
        res.redirect("/users/login/success");
    }
);

// Login error and success
userRouter.get("/login/error", function(req, res) {
    res.json({
        msg: "Invalid username or password"
    });
});

userRouter.get("/login/success", function(req, res) {
    res.json({
        msg: `Welcome ${req.user.username}`
    });
});

module.exports = userRouter;
