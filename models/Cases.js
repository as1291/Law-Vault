const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    casename: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
     
    },
    documents: {
      type: String,
      required: true,
    },
    lawyers: {
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
    status:{
      type :String,
      default:"pending",
      required:false,
      },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Cases", CaseSchema);