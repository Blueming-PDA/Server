const mongoose = require("mongoose");

const headerMessageSchema = new mongoose.Schema({
  headerMessage: {
    type: String,
    required: true,
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: {
    type: String,
    required: true,
  },
});

headerMessageSchema.set("timestamps", {
  createdAt: "createdAt",
});

const HeaderMessage = mongoose.model("HeaderMessage", headerMessageSchema);

module.exports = HeaderMessage;
