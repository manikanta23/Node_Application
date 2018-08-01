const mongoose = require('mongoose');

const ReviewModel = mongoose.model("Review", {
    productId: { type: String, required: true },
    subject: { type: String, required: true },
    rating: Number,
    message: String,
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = ReviewModel;

