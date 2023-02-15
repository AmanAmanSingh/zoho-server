const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Last_Name: {
        type: String,
    },
    id: {
        type: Number
    }
})

module.exports = mongoose.model("/Lead", leadSchema);