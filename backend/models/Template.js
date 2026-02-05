const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);