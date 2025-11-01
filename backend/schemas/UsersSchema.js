const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        match: /^[a-zA-Z\s]{2,50}$/
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    // Link holdings and positions
    holdings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "holding"
        }
    ],
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "position"
        }
    ],
})


module.exports = usersSchema;