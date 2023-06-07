const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    heading: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
