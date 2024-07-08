const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    quantities: [Number],
    total: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
