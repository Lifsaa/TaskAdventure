import express from "express";
import { CalendarEvent } from "../models/Calendar.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Get all calendar events for the authenticated user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ userId: req.userId });
    res.json(events);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new calendar event
router.post("/", authenticateUser, async (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).send("Missing required fields");

  try {
    const newEvent = new CalendarEvent({
      title,
      date,
      description: description || "",
      userId: req.userId,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update a calendar event
router.put("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { title, date, description } = req.body;

  try {
    const event = await CalendarEvent.findOne({ _id: id, userId: req.userId });
    if (!event) return res.status(404).send("Event not found");

    if (title) event.title = title;
    if (date) event.date = date;
    if (description) event.description = description;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete a calendar event
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CalendarEvent.deleteOne({ _id: id, userId: req.userId });
    if (result.deletedCount === 0) return res.status(404).send("Event not found");
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get event counts for the authenticated user
router.get("/count", authenticateUser, async (req, res) => {
  try {
    const totalEvents = await CalendarEvent.countDocuments({ userId: req.userId });
    res.json({ totalEvents });
  } catch (error) {
    console.error("Error fetching event counts:", error);
    res.status(500).send("Server error");
  }
});

export default router;
