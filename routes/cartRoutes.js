const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('products user');
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new cart
router.post('/', async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single cart
router.get('/:id', getCart, (req, res) => {
    res.json(res.cart);
});

// Update a cart
router.put('/:id', getCart, async (req, res) => {
    if (req.body.products != null) {
        res.cart.products = req.body.products;
    }
    if (req.body.quantities != null) {
        res.cart.quantities = req.body.quantities;
    }
    if (req.body.user != null) {
        res.cart.user = req.body.user;
    }
    try {
        const updatedCart = await res.cart.save();
        res.json(updatedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a cart
router.delete('/:id', getCart, async (req, res) => {
    try {
        await res.cart.remove();
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCart(req, res, next) {
    let cart;
    try {
        cart = await Cart.findById(req.params.id).populate('products user');
        if (cart == null) {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.cart = cart;
    next();
}

module.exports = router;
