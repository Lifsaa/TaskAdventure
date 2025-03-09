import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT Token
function generateAccessToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      process.env.TOKEN_SECRET || "your-secret-key",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      },
    );
  });
}

// Register User
export async function registerUser(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res.status(400).json({ error: "Invalid input" });

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        error:
          existingUser.username === username ? "Username taken" : "Email taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, hashedPassword, email });
    await user.save();
    const token = await generateAccessToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// Login User
export async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = await generateAccessToken(user._id.toString());
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
