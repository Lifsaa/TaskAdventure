import express from "express";
import { Task } from "../models/Task.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Get all tasks for the authenticated user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new task
router.post("/", authenticateUser, async (req, res) => {
  const { label, date, difficulty, socialstat } = req.body;
  if (!label || !date || !difficulty || !socialstat)
    return res.status(400).send("Missing fields");

  try {
    const newTask = new Task({
      label,
      date,
      difficulty,
      socialstat,
      checked: false,
      userId: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Toggle task checked status
router.put("/:id", authenticateUser, async (req, res) => {
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

// Delete a task
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Task.deleteOne({ _id: id, userId: req.userId });
    if (result.deletedCount === 0)
      return res.status(404).send("Task not found");
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get task counts for authenticated user
router.get("/count", authenticateUser, async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.userId });
    const completedTasks = await Task.countDocuments({
      userId: req.userId,
      checked: true,
    });
    res.json({ totalTasks, completedTasks });
  } catch (error) {
    console.error("Error fetching task counts:", error);
    res.status(500).send("Server error");
  }
});

export default router;
