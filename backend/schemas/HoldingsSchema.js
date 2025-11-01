const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const HoldingsSchema = new Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true},
    avg: {type: Number, required: true},
    price: {type: Number, required: true},
    net: {type: String, required: true},
    day: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link back
})


module.exports = HoldingsSchema;