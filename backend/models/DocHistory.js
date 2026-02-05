const mongoose = require("mongoose");

const docHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    sourceType: {
      type: String,
      enum: ["text", "zip"],
    },

    inputPrompt: String,

    generateDocs: String,

    filesUploaded: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DocHistory", docHistorySchema); 