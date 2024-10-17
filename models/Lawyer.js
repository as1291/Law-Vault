const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema(
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
    cases: {
      type: Array,
      required: false,
    },
    clients: {
      type: Array,
      required: false,
    }, 
     categories: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    barid: {
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

module.exports = mongoose.model("Lawyer", LawyerSchema);