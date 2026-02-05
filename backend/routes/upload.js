const express = require("express");
const upload = require("../middleware/upload");
const fs = require("fs");

const router = express.Router();

router.post("/", upload.array("files", 5), async (req, res) => {
  try {
    const contents = req.files.map((file) =>
      fs.readFileSync(file.path, "utf8")
    );

    res.json({
      files: req.files.map((f) => f.filename),
      combinedText: contents.join("\n\n"),
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;