const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('product user');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single comment
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Update a comment
router.put('/:id', getComment, async (req, res) => {
    if (req.body.product != null) {
        res.comment.product = req.body.product;
    }
    if (req.body.user != null) {
        res.comment.user = req.body.user;
    }
    if (req.body.rating != null) {
        res.comment.rating = req.body.rating;
    }
    if (req.body.images != null) {
        res.comment.images = req.body.images;
    }
    if (req.body.text != null) {
        res.comment.text = req.body.text;
    }
    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a comment
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getComment(req, res, next) {
    let comment;
    try {
        comment = await Comment.findById(req.params.id).populate('product user');
        if (comment == null) {
            return res.status(404).json({ message: 'Comment not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.comment = comment;
    next();
}

module.exports = router;
