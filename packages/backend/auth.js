import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

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
      }
    );
  });
}

// Register User
export async function registerUser(req, res) {
  const { username, pwd } = req.body;
  if (!username || !pwd) return res.status(400).send("Invalid input");

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).send("Username taken");

    const hashedPassword = await bcrypt.hash(pwd, 10);
    const user = new User({ username, hashedPassword });
    await user.save();
    const token = await generateAccessToken(user._id.toString());
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

// Login User
export async function loginUser(req, res) {
  const { username, pwd } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(pwd, user.hashedPassword))) {
      return res.status(401).send("Invalid credentials");
    }
    const token = await generateAccessToken(user._id.toString());
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

// Authentication Middleware
export function authenticateUser(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, process.env.TOKEN_SECRET || "your-secret-key", (error, decoded) => {
    if (error) return res.status(401).send("Invalid token");
    req.userId = decoded.userId;
    next();
  });
}