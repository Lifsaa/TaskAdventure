import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";

dotenv.config({ path: "../.env" }); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

// Ensure MONGO_URI is properly set
if (!mongoURI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/tasks", taskRoutes); // Prefixed with `/api`
app.use("/api/stats", statsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/calendar", calendarRoutes); // Ensure frontend uses `/api/calendar`

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
