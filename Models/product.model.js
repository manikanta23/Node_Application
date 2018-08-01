const mongoose = require('mongoose');

module.exports = mongoose.model("Product", {
Name: String,
Price: Number,
Desc: String
});