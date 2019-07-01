const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

var server = express();
var port = process.env.PORT || 3000;

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// Database models
var playlistModel = require("./playlist_schema.js");
var transactionModel = require("./transactions_schema.js");

// REST endpoints
// Playlist collection
server.get("/playlist", function(req, res) {
    playlistModel.find().then(function(playlist) {
        // var response = {
        //     playlist: playlist
        // }
        // res.json(response);
        res.json({
            playlist: playlist
        });
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.post("/playlist", function(req, res) {
    playlistModel.create({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        seconds: req.body.seconds,
        genre: req.body.genre,
    }).then(function(new_song) {
        res.status(201);
        res.json({
            new_song: new_song
        });
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.delete("/playlist/:id", function(req, res) {
    playlistModel.findByIdAndDelete(req.params.id).then(function() {
        // res.status(204);
        // res.send();
        res.status(204).send();
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.get("/playlist/:id", function(req, res) {
    playlistModel.findById(req.params.id).then(function(song) {
        if (song == null) {
            res.status(404);
            res.json({
                msg: `There is no song with the id of ${req.params.id}`
            });
        } else {
            res.json({
                song: song
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.put("/playlist/:id", function(req, res) {
    playlistModel.findById(req.params.id).then(function(song) {
        if (song == null) {
            res.status(404);
            res.json({
                msg: `There is no song with the id of ${req.params.id}`
            });
        } else {
            if (req.body.title != undefined) {
                song.title = req.body.title;
            }
            if (req.body.artist != undefined) {
                song.artist = req.body.artist;
            }
            if (req.body.album != undefined) {
                song.album = req.body.album;
            }
            if (req.body.seconds != undefined) {
                song.seconds = req.body.seconds;
            }
            if (req.body.genre != undefined) {
                song.genre = req.body.genre;
            }
            if (req.body.date != undefined) {
                song.date = req.body.date;
            }

            song.save().then(function() {
                res.status(200);
                res.json({
                    song: song
                });
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

// Transaction collection
server.get("/transactions", function(req, res) {
    transactionModel.find().then(function(transactions) {
        res.json({
            transactions: transactions
        });
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.post("/transactions", function(req, res) {
    transactionModel.create({
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type
    }).then(function(new_transaction) {
        res.status(201);
        res.json({
            new_transaction: new_transaction
        });
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.delete("/transactions/:id", function(req, res) {
    transactionModel.findByIdAndDelete(req.params.id).then(function() {
        res.status(204).send();
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.get("/transactions/:id", function(req, res) {
    transactionModel.findById(req.params.id).then(function(transaction) {
        if(transaction == null) {
            res.status(404);
            res.json({
                msg: `Could not find a transaction with the id of ${req.params.id}`
            });
        } else {
            res.json({
                transaction: transaction
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

server.put("/transactions/:id", function(req, res) {
    transactionModel.findById(req.params.id).then(function(transaction) {
        if (transaction == null) {
            res.status(404);
            res.json({
                msg: `There is no transaction with the id of ${req.params.id}`
            });
        } else {
            if (req.body.number != undefined) {
                transaction.number = req.body.number;
            }
            if (req.body.amount != undefined) {
                transaction.amount = req.body.amount;
            }
            if (req.body.description != undefined) {
                transaction.description = req.body.description;
            }
            if (req.body.type != undefined) {
                transaction.type = req.body.type;
            }
            if (req.body.date != undefined) {
                transaction.date = req.body.date;
            }

            transaction.save().then(function() {
                res.status(200);
                res.json({
                    transaction: transaction
                });
            });
        }
    }).catch(function(error) {
        res.status(400).json({msg: error.message});
    });
});

// Start the server and connect to the database
// change the "test" inside the connect string to change which database to use
mongoose.connect("mongodb+srv://LuTen16:16TenLu@firstcluster-x9et2.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(function() {
    server.listen(port, function() {
        console.log(`Listening on port ${port}`);
    });
});
