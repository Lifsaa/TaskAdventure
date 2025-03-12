import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  label: String,
  date: String,
  difficulty: String,
  socialstat: String,
  checked: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Task = mongoose.model("Task", taskSchema);
