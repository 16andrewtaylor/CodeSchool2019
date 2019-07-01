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

server.get("/transactions", function(req, res) {
    transactionModel.find().then(function(transactions) {
        res.json({
            transactions: transactions
        });
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
