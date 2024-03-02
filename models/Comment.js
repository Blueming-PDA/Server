const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
  },
  isAnonymous: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  commentReplys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

commentSchema.set("timestamps", {
  createdAt: "commentCreatedAt",
  updatedAt: "commentUpdatedAt",
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
