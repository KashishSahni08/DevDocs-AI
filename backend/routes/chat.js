const express = require("express");
const auth = require("../middleware/auth");
const Chat = require("../models/Chat");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const chat = await Chat.create({
    userId: req.user._id,
    title: req.body.title || "New Chat",
    messages: [],
  });

  res.json(chat);
});

router.post("/:id/message", auth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  chat.messages.push(req.body.message);
  await chat.save();

  res.json(chat);
});

router.get("/", auth, async (req, res) => {
  const chats = await Chat.find({ userId: req.user._id }).sort({
    updatedAt: -1,
  });

  res.json(chats);
});

router.get("/:id", auth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.json(chat);
});
// RENAME CHAT
router.put("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title: req.body.title },
      { new: true }
    );

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE CHAT
router.delete("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;