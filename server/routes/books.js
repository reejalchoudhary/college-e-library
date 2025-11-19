
import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json({ book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/books
router.post("/", async (req, res) => {
  try {
    const { title, author, description, fileUrl, tags } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Missing title/author" });
    const book = new Book({ title, author, description, fileUrl, tags });
    await book.save();
    res.status(201).json({ book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/books/:id
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json({ book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
