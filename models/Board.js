const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  boardTitle: { type: String, required: true },
  boardContent: { type: String, required: true },
  boardFile: { type: String },
  isAnonymous: { type: Number, required: true },
  tag: [{ type: String, required: true }],
  boardType: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

boardSchema.set("timestamps", {
  boardCreatedAt: "createdAt",
  boardUpdatedAt: "updatedAt",
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
