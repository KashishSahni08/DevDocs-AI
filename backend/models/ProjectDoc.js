const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectTitle: String,

    pages: [pageSchema],

    sourceType: {
      type: String,
      enum: ["text", "zip"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectDoc", projectSchema);