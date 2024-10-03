// backend/models/Project.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  reply: { type: String },
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
