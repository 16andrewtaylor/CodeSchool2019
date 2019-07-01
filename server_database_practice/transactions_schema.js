const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: -5000,
        max: 5000,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toDateString()
    }
});

// "transactions" is the name of the table inside the database
var model = mongoose.model("transactions", transactionSchema);
module.exports = model;
