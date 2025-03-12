import express from "express";
import { User } from "../models/User.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/info", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Retrieved:", user); // Debugging

    res.json({
      username: user.username,
      email: user.email || "Email not found", // Ensure email is included
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
