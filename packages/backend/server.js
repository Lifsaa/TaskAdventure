import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// In-memory task storage
let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { label, date, difficulty} = req.body;
  if (!label || !date || !difficulty) {
    return res.status(400).json({ error: "Label and date and difficulty are required" });
  }

  const newTask = {
    id: Date.now(),
    label,
    date,
    difficulty,
    checked: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle task completion
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id == id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.checked = !task.checked; // Toggle the checked status
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  res.status(204).send(); // No content on successful deletion
});