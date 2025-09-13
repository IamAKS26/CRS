const express = require("express");
const router = express.Router();
const College = require("../Models/college");
const StudentProfile = require("../Models/StudentProfile");
const { verifyToken } = require("../Middleware/AuthValidation");

// This route now uses only the student's CET score for recommendations
router.post("/recommend", verifyToken, async (req, res) => {
    try {
        // 1. Get the student's profile to find their CET score
        const studentProfile = await StudentProfile.findOne({ userId: req.userId });

        // Check if the student has a score saved in their profile
        if (!studentProfile || !studentProfile.academicDetails?.entranceExam?.score) {
            return res.status(400).json({ message: "Please update your entrance exam score in your profile." });
        }
        const studentScore = studentProfile.academicDetails.entranceExam.score;
        
        // 2. Build the query using ONLY the student's score
        // Location and stream are no longer needed.
        const query = {
            branches: {
                $elemMatch: {
                    // Find colleges where at least one branch has a cutoff
                    // that is less than or equal to the student's score
                    cutoff: { $lte: studentScore }
                }
            }
        };

        // 3. Find, sort, and limit the results
        const recommendedColleges = await College.find(query)
            .sort({ 'branches.cutoff': -1 }) // Sort by best cutoff first
            .limit(15); // Limit to 15 results

        // 4. Send the results back to the dashboard
        res.json(recommendedColleges);

    } catch (error)
     {
        console.error("❌ Recommendation error:", error);
        res.status(500).json({ message: "Server error while fetching recommendations." });
    }
});

// Route to add a new college (for admin use)
router.post("/add", async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json({ message: "College added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
