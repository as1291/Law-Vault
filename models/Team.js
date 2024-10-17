const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    lawyerid: {
      type: Array,
      required: true,
      unique: true,
    },
    username: {
      type: Array,
      required: true,
      unique: true,
    },
    email: {
      type: Array,
      required: true,
      unique: true,
    },
    contact: {
      type: Array,
      required: true,
      unique: true,
    },
    access: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
