import express from "express";
import { Contact } from "../models/Contact.js";

const router = express.Router();

// Contact Form Submission
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
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

export default router;
