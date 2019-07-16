const express = require("express");
const auth = require("../auth/auth.js");
const postsModel = require("../models/user.js");

var postsRouter = express.Router();

postsRouter.get("/", auth.protected, function(req, res) {
    postsModel.find().then(function(posts) {
        // write a filter funciton to sort all the posts by date, or just reverse the list
        var reversed_list = [];
        posts.forEach(function(post) {
            reversed_list.unshift(post);
        });
        var response = {
            posts: reversed_list
        };
        res.json(response);
    }).catch(function(error) {
        var response = {
            msg: error.message
        };
        res.status(400);
        res.json(response);
    });
});

postsRouter.post("/", function(req, res) {
    postsModel.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        // skip the date field and use the default
        image: req.body.image,
        text: req.body.text
    }).then(function(new_post) {
        res.status(201);
        res.json(new_post);
    }).catch(function(error) {
        // If anything went wrong above, we catch the error here
        var response = {
            msg: error.message
        };
        res.status(400);
        res.json(response);
    });
});

// DELETE /posts/id
postsRouter.delete("/:id", function(req, res) {
    postsModel.findByIdAndDelete(req.params.id).then(function() {
        res.status(204);
        res.send();
    }).catch(function(error) {
        var response = {
            msg: error.message
        };
        res.status(400);
        res.json(response);
    });
});

postsRouter.put("/:id", function(req, res) {
    postsModel.findById(req.params.id).then(function(post) {
        if (post == null) {
            res.status(404);
            res.json({
                msg: `There is no post with the id of ${req.params.id}`
            });
        } else {
            if (req.body.title != undefined) {
                post.title = req.body.title;
            }
            if (req.body.author != undefined) {
                post.author = req.body.author;
            }
            if (req.body.category != undefined) {
                post.category = req.body.category;
            }
            if (req.body.image != undefined) {
                post.image = req.body.image;
            }
            if (req.body.text != undefined) {
                post.text = req.body.text;
            }

            post.save().then(function() {
                res.status(200);
                res.json({
                    post: post
                });
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

module.exports = postsRouter;
