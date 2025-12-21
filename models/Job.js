const { MongoOIDCError, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { ref } = require("process");

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxLength: 100,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", JobsSchema);
