const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lawyers: {
      type: Array,
      required: false,
    },
    cases: {
      type: Array,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    addhar: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true,
    },
    prof: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Clients", ClientSchema);