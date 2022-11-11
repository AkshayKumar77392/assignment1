const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
     
        name: {
            type: String,
            required: true,
            trim: true
        },
        subject: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true

        },
        password: {
            type: String,
            required: true,
            minLen: 8,
            maxLen: 15
        }
    },

    { timestamps: true },

);

module.exports = mongoose.model('user', userSchema)