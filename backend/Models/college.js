const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  cutoff: { type: Number, required: true },
  seats: { type: Number, required: true },
  fees: { type: Number, required: true },
  code: { type: String }
});

const collegeSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  location: { type: String, required: true },
  cetCode: { type: String, required: true },
  officialLink: { type: String, required: true },
  branches: [branchSchema]
});

module.exports = mongoose.model("College", collegeSchema);
