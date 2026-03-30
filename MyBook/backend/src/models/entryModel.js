const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: { type: Date, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    mood: {
      type: String,
      required: true,
      enum: ["\u{1F642}", "\u{1F60C}", "\u{1F614}", "\u{1F621}"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
  },
  { timestamps: true }
);

const entryModel = mongoose.model("Entry", entrySchema);

module.exports = entryModel;
