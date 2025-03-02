import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

  //Task Stat Schema
  const taskSchema = new mongoose.Schema({
    label: String,
    date: String,
    difficulty: String,
    socialstat: String,
    checked: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  const Task = mongoose.model("Task", taskSchema);
  
  //Social Stat Schema
  const socialstatSchema = new mongoose.Schema({
    name: String,
    lv: Number,
    xpNextLevel: Number,
    xpGainedThisLv: Number,
    totalXpGained: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  const SocialStat = mongoose.model("SocialStat", taskSchema);

// Contact Schema

const contactSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    message: String,
    createdAt: {type:Date, default:Date.now},
  }
);
const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req,res)=>
{
  const {name, email,message} = req.body;
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).send("Message received");
  } catch (error) {
    res.status(500).send("Server error");
  }
});


// Authentication Routes
app.post("/signup", registerUser);
app.post("/login", loginUser);

// Task Schema
const taskSchema = new mongoose.Schema({
  label: String,
  date: String,
  difficulty: String,
  checked: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Task = mongoose.model("Task", taskSchema);

// Add a new task
app.post("/tasks", (req, res) => {
  const { label, date, difficulty, socialstat} = req.body;
  if (!label || !date || !difficulty || !socialstat) {
    return res.status(400).json({ error: "Label and date and difficulty and socialstat are required" });
  }
});

  const newTask = {
    id: Date.now(),
    label,
    date,
    difficulty,
    socialstat,
    checked: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
// Protected Task Routes
app.get("/tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.post("/tasks", authenticateUser, async (req, res) => {
  const { label, date, difficulty } = req.body;
  if (!label || !date || !difficulty)
    return res.status(400).send("Missing fields");

  try {
    const newTask = new Task({
      label,
      date,
      difficulty,
      checked: false,
      userId: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.put("/tasks/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, userId: req.userId });
    if (!task) return res.status(404).send("Task not found");
    task.checked = !task.checked;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.delete("/tasks/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Task.deleteOne({ _id: id, userId: req.userId });
    if (result.deletedCount === 0) return res.status(404).send("Task not found");
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
