// backend/routes/blogs.js
const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Create a new blog (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, description, content } = req.body;
  const blog = new Blog({ title, description, content });
  await blog.save();
  res.status(201).json(blog);
});

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

module.exports = router;
