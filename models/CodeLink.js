const mongoose = require("mongoose");

const CodeLinkSchema = new mongoose.Schema({
  codeLink: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: {
    type: String,
    required: true,
  },
  activate: {
    type: Boolean,
    default: true,
  },
});

CodeLinkSchema.set("timestamps", {
  createdAt: "codeLinkCreatedAt",
  updatedAt: "codeLinkUpdatedAt",
});

CodeLinkSchema.pre("save", function (next) {
  if (this.activate) {
    // 현재 문서의 'activate'가 'true'인 경우
    this.constructor
      .updateMany({ activate: true }, { activate: false }) // 모든 'activate'가 'true'인 문서를 'false'로 바꿈
      .then(() => next())
      .catch((err) => next(err));
  } else {
    next();
  }
});

const CodeLink = mongoose.model("CodeLink", CodeLinkSchema);

module.exports = CodeLink;
