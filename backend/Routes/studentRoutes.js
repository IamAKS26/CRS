const express = require("express");
const router = express.Router();
const StudentProfile = require("../Models/StudentProfile");
const { verifyToken } = require("../Middleware/AuthValidation");

// Get logged-in student's profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.userId })
      .populate("userId", "name email stream"); // Includes stream

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update logged-in student's profile
router.put("/me", verifyToken, async (req, res) => {
  try {
    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("userId", "name email stream"); // Includes stream

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Save a college to the logged-in student's profile
router.post('/me/save-college', verifyToken, async (req, res) => {
    try {
        const { collegeId } = req.body;
        if (!collegeId) {
            return res.status(400).json({ message: 'College ID is required.' });
        }

        const updatedProfile = await StudentProfile.findOneAndUpdate(
            { userId: req.userId },
            { $addToSet: { savedColleges: collegeId } }, // Prevents duplicates
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found.' });
        }
        res.status(200).json({ message: 'College saved successfully!', profile: updatedProfile });
    } catch (error) {
        console.error('Save college error:', error);
        res.status(500).json({ message: 'Server error while saving college.' });
    }
});

module.exports = router;