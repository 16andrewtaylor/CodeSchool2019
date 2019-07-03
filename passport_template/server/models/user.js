const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

var model = mongoose.model("user", userModel);
module.exports = model;
