const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        default: null,
    },

    googleId: {
        type: String,
        default: null,
        unique: true,   // <-- ye add karo
        sparse: true    // <-- ye bhi add karo
    },

    picture: {
        type: String,
        default: null,
    },

    provider: {
        type: String,
        enum: ["google"],   // <-- better
        default: "google",
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("users", userSchema);