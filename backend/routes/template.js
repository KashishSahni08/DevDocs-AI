const express = require("express");
const auth = require("../middleware/auth");
const {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleFavorite,
} = require("../controllers/templateController");

const router = express.Router();

router.get("/", auth, getTemplates);
router.post("/", auth, createTemplate);
router.put("/:id", auth, updateTemplate);
router.delete("/:id", auth, deleteTemplate);
router.patch("/:id/favorite", auth, toggleFavorite);

module.exports = router;