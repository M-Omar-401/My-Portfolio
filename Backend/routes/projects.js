// backend/routes/projects.js
const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Create a new project (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({ title, description });
  await project.save();
  res.status(201).json(project);
});

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add a comment to a project
router.post('/:id/comments', protect, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  project.comments.push({ comment: req.body.comment });
  await project.save();
  res.status(201).json(project);
});

module.exports = router;
