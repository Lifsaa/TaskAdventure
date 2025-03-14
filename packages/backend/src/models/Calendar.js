import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  socialstat: { type: String, enum: ["Creativity", "Healthfulness", "Intelligence", "Kindness", "Skillfulness", "Sociability"], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const CalendarEvent = mongoose.model("CalendarEvent", calendarEventSchema);
