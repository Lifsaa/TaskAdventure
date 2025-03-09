import React from "react";
import styles from "../styles/StatsPage.module.css";

const ProgressBar = ({ level, xp, maxXp, color }) => {
  const progress = Math.min((xp / maxXp) * 100, 100); // Cap at 100%

  return (
    <div className="mb-4">
      <p className="text-lg font-semibold">Level {level}</p>
      <p className="text-sm text-gray-500 mb-2">
        {xp}/{maxXp} XP to Next Level
      </p>
      {/* Parent container (Grey background, fixed height) */}
      <div
        className="w-full bg-gray-200 rounded-full shadow-sm overflow-hidden"
        style={{ height: "15px", backgroundColor: "gray", width: "500px" }}
      >
        {/* Child bar (Colored progress) */}
        <div
          className="rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            height: "15px", // Same height as parent
          }}
        />
      </div>
    </div>
  );
};

const UserStats = () => {
  const stats = [
    { name: "Healthfulness", level: 10, xp: 4, maxXp: 100, color: "#16a34a" }, // Green
    { name: "Kindness", level: 14, xp: 17, maxXp: 140, color: "#f43f5e" }, // Pink
    { name: "Creativity", level: 7, xp: 40, maxXp: 70, color: "#3b82f6" }, // Blue
    { name: "Sociability", level: 12, xp: 89, maxXp: 120, color: "#f59e0b" }, // Yellow
    { name: "Intelligence", level: 18, xp: 135, maxXp: 180, color: "#8b5cf6" }, // Purple
    { name: "Proficiency", level: 5, xp: 8, maxXp: 50, color: "#0ea5e9" }, // Cyan
  ];

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-black tracking-wider">
        User Stats
      </h2>
      <div className="mb-10">
        <ProgressBar level={50} xp={4690} maxXp={5000} color="#000" />
      </div>
      {stats.map((stat) => (
        <div key={stat.name} className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{stat.name}</h3>
          <ProgressBar
            level={stat.level}
            xp={stat.xp}
            maxXp={stat.maxXp}
            color={stat.color}
          />
        </div>
      ))}
    </div>
  );
};

export default UserStats;
