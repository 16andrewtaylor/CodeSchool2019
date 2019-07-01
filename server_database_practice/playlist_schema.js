const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Unknown"
    },
    artist: {
        type: String,
        required: true,
        default: "Unknown"
    },
    seconds: {
        type: Number,
        required: true,
        default: 0
    },
    album: {
        type: String,
        required: true,
        default: "Unknown"
    },
    genre: {
        type: String,
        required: true,
        default: "Unknown"
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
