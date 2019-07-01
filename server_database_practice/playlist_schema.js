const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    seconds: {
        type: Number,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toDateString()
    }
});

// "playlist" is the name of the table inside the database
var model = mongoose.model("playlists", playlistSchema);
module.exports = model;
