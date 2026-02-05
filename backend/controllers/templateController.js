const Template = require("../models/Template");

/* ================= GET ALL ================= */
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createTemplate = async (req, res) => {
  try {
    const tpl = await Template.create({
      ...req.body,
      user: req.user._id,
    });

    res.json(tpl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateTemplate = async (req, res) => {
  try {
    const tpl = await Template.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(tpl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteTemplate = async (req, res) => {
  try {
    await Template.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= TOGGLE FAVORITE ================= */
exports.toggleFavorite = async (req, res) => {
  try {
    const tpl = await Template.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    tpl.isFavorite = !tpl.isFavorite;
    await tpl.save();

    res.json(tpl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};