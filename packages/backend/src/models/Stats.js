import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  name: String,
  xp: Number,
  color: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Stats = mongoose.model("Stats", statsSchema);
