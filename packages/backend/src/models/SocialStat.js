import mongoose from "mongoose";

const socialstatSchema = new mongoose.Schema({
  name: String,
  lv: Number,
  xpNextLevel: Number,
  xpGainedThisLv: Number,
  totalXpGained: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const SocialStat = mongoose.model("SocialStat", socialstatSchema);
