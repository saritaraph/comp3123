const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/NotesModel');
const noteRoutes = express.Router();

// CREATE - POST /api/notes
noteRoutes.post('/notes', async (req, res) => {
  const { noteTitle, noteDescription, priority } = req.body;
  if (!noteTitle || !noteDescription) {
    return res.status(400).send({ message: 'Note title and description are required' });
  }
  try {
    const note = await Note.create({
      noteTitle,
      noteDescription,
      priority: priority || 'MEDIUM'
    });
    return res.status(201).send({ message: 'Note created successfully', note });
  } catch (error) {
    return res.status(500).send({ message: error.message || 'Error creating note' });
  }
});

// READ ALL - GET /api/notes
noteRoutes.get('/notes', async (_req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    return res.status(200).send(notes);
  } catch (error) {
    return res.status(500).send({ message: error.message || 'Error retrieving notes' });
  }
});

// READ ONE - GET /api/notes/:noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).send({ message: 'Invalid note id' });
  }
  try {
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).send({ message: `Note not found with id ${noteId}` });
    return res.status(200).send(note);
  } catch (error) {
    return res.status(500).send({ message: `Error retrieving note with id ${noteId}` });
  }
});

// UPDATE - PUT /api/notes/:noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).send({ message: 'Invalid note id' });
  }
  const { noteTitle, noteDescription, priority } = req.body;
  if (!noteTitle && !noteDescription && !priority) {
    return res.status(400).send({ message: 'Please provide at least one field to update' });
  }
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { noteTitle, noteDescription, priority, dateUpdated: Date.now() },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).send({ message: `Note not found with id ${noteId}` });
    return res.status(200).send({ message: 'Note updated successfully', note });
  } catch (error) {
    return res.status(500).send({ message: `Could not update note with id ${noteId}` });
  }
});

// DELETE - DELETE /api/notes/:noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  if (!mongoose.isValidObjectId(noteId)) {
    return res.status(400).send({ message: 'Invalid note id' });
  }
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) return res.status(404).send({ message: `Note not found with id ${noteId}` });
    return res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: `Could not delete note with id ${noteId}` });
  }
});

module.exports = noteRoutes;
