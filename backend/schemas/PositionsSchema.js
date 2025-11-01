const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const positionsSchema = new Schema({
    product: {type: String,  required: true},
    name: {type: String,  required: true},
    qty: {type: Number,  required: true},
    avg: {type: Number,  required: true},
    price: {type: Number,  required: true},
    net: {type: String,  required: true},
    day: {type: String,  required: true},
    isLoss: {type: Boolean,  required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link back
})


module.exports = positionsSchema;