const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: { type: Date, required: true },
    title: String,
    mood: {
      type: String,
      enum: ["\u{1F642}", "\u{1F60C}", "\u{1F614}", "\u{1F621}"],
    },
    content: String,
  },
  { timestamps: true }
);

const entryModel = mongoose.model("Entry", entrySchema);

module.exports = entryModel;
