const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",   // reference to User collection
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  profilePicture: {
    type: String, // URL or file path
  },
  academicDetails: {
    tenthPercentage: {
      type: Number,
    },
    twelfthPercentage: {
      type: Number,
    },
    entranceExam: {
      name: { type: String, default: "MHT-CET" },
      score: { type: Number },
    },
    preferredStream: {
      type: String,
    },
  },
  savedColleges: [{
    type: Schema.Types.ObjectId,
    ref: 'College' // This creates a reference to a document in the 'College' collection
  }],
}, { timestamps: true });

module.exports = mongoose.model("studentProfiles", StudentProfileSchema);