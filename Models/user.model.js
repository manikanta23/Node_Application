const mongoose = require('mongoose');

const UserModel = mongoose.model("User", {
    UserName: { type: String, unique: true, require: [true, "Username is required"] },
    Password: { type: String, require: true },
    Active: { type: Boolean, default: true },
    LastUpdated: { type: Date, default: Date.now }
});

module.exports = UserModel;