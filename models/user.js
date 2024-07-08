const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    shippingAddress: String
});

module.exports = mongoose.model('User', UserSchema);
