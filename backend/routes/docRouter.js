const express = require("express");
const multer = require("multer");

const generate = require("../gemini");
const Doc = require("../models/DocHistory");
const auth = require("../middleware/auth");

const router = express.Router();

/* ===============================
   POST → GENERATE DOCS
================================ */
router.post("/generate-docs", auth, async (req, res) => {
  try {
    const { prompt, title } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const docs = await generate(prompt);

    const savedDoc = await Doc.create({
      userId: req.user._id,
      title: title || "Untitled",
      sourceType: "text",
      inputPrompt: prompt,
      generateDocs: docs,
      filesUploaded: [],
    });

    res.json(savedDoc);

  } catch (err) {
    console.error("DOC ERROR:", err);

    res.status(500).json({ error: "Gemini generation failed" });
  }
});

/* ===============================
   GET → HISTORY
================================ */
router.get("/history", auth, async (req, res) => {
  try {
    const docs = await Doc.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(docs);

  } catch (err) {
    res.status(500).json({ error: "History fetch failed" });
  }
});

/* ===============================
   GET → SINGLE
================================ */
router.get("/history/single/:id", auth, async (req, res) => {
  try {
    const doc = await Doc.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!doc) {
      return res.status(404).json({ error: "Doc not found" });
    }

    res.json(doc);

  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;