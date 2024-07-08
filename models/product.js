const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    description: String,
    image: String,
    pricing: Number,
    shippingCost: Number
});

module.exports = mongoose.model('Product', ProductSchema);
