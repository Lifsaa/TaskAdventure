/*
import express from "express";
import { Stats } from "../models/Stats.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

const defaultStats = [
  { name: "Creativity", xp: 0, color: "#00FF00", userid: },
  { name: "Healthfunless", xp: 0, color: "#00FF00" },
  { name: "Kindness", xp: 0, color: "#00FF00" },
  { name: "Intelligence", xp: 0, color: "#00FF00" },
  { name: "Sociability", xp: 0, color: "#00FF00" },
  { name: "Skillfunless", xp: 0, color: "#00FF00" },
];

// Get all stats for the authenticated user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const stats = await Stats.find({ userId: req.userId });
    res.json(stats);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Create a new stat
router.post("/", authenticateUser, async (req, res) => {
  const {name, xp, color} = req.body;
    return res.status(400).send("Missing fields");

  try {
    const newStat = new Stat({
      name,
      xp,
      color,
      userId: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
/*
router.post("/initialize-stats", authenticateUser, async (req, res) => {
  try {
    const userId = req.user?.id; // Safely extract user ID

    console.log("Initializing stats for user:", userId); // Debugging

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    let user = await User.findById(userId);
    if (!user) {
      console.log("User not found in DB:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.stats && user.stats.length > 0) {
      console.log("User already has stats:", user.stats);
      return res.status(400).json({ message: "Stats already initialized" });
    }

    // Assign default stats
    user.stats = [...defaultStats];
    await user.save();

    console.log("Stats initialized successfully for:", userId);
    res.status(201).json(user.stats);
  } catch (error) {
    console.error("Error initializing stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
*/

import express from "express";
import { Stats } from "../models/Stats.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Updated default stats - includes all 7 stats with proper names
const defaultStats = [
  { name: "Creativity", xp: 0, color: "#3b82f6" },
  { name: "Healthfulness", xp: 0, color: "#278a58" },
  { name: "Kindness", xp: 0, color: "#f43f5e" },
  { name: "Intelligence", xp: 0, color: "#a88aed" },
  { name: "Sociability", xp: 0, color: "#f5c20b" },
  { name: "Skillfulness", xp: 0, color: "#876148" },
];

// Get all stats for the authenticated user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const stats = await Stats.find({ userId: req.userId });
    res.json(stats);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/initialize-stats", authenticateUser, async (req, res) => {
  try {
    // Use userId from the auth middleware
    const userId = req.userId;

    console.log("Initializing stats for user:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    // Check if stats already exist for this user
    const existingStats = await Stats.find({ userId });
    if (existingStats.length > 0) {
      console.log("User already has stats:", existingStats);
      return res.status(400).json({ message: "Stats already initialized" });
    }

    // Create an array of stat objects to insert
    const statsToCreate = defaultStats.map(stat => ({
      name: stat.name,
      xp: stat.xp,
      color: stat.color,
      userId
    }));

    // Insert all stats at once
    const newStats = await Stats.insertMany(statsToCreate);

    console.log("Stats initialized successfully for:", userId);
    res.status(201).json(newStats);
  } catch (error) {
    console.error("Error initializing stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Update stats upon task completion
router.put("/update", authenticateUser, async (req, res) => {
  try {
    const { statName, xpAmount } = req.body;
    const userId = req.userId;

    if (!statName || !xpAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the specific stat document
    const stat = await Stats.findOne({ userId, name: statName });
    
    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }

    // Update the XP
    stat.xp += xpAmount;
    await stat.save();

    console.log(`Updated ${statName} for user ${userId} by ${xpAmount} XP`);
    res.status(200).json(stat);
  } catch (error) {
    console.error("Error updating stat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;