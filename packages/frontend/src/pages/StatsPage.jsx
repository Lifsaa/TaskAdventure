import React, { useState, useEffect } from "react";
import styles from "../styles/StatsPage.module.css";
import { useTheme } from "@mui/material/styles";

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

const StatsPage = ({ token }) => {
  const [stats, setStats] = useState([]);
  const [totalXp, setTotalXp] = useState(0);
  const [totalLevel, setTotalLevel] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const processedStats = processStats(data);
          setStats(processedStats);
          calculateTotalXpAndLevel(processedStats);
        } else {
          console.error("Error fetching stats");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  const processStats = (stats) => {
    return stats.map((stat) => ({
      ...stat,
      level: Math.ceil((stat.xp + 0.1) / 100),
      xpRemaining: stat.xp % 100,
      maxXp: 100,
    }));
  };

  const calculateTotalXpAndLevel = (stats) => {
    const totalXpSum = stats.reduce((sum, stat) => sum + stat.xp, 0);
    setTotalXp(totalXpSum);
    setTotalLevel(Math.ceil((totalXpSum + 0.1) / 500));
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-black tracking-wider">
        User Stats
      </h2>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900">
          Overall Level: {totalLevel}
        </h3>
        <p className="text-lg text-gray-700">Total XP: {totalXp}</p>
        <p className="text-lg text-gray-700">
          {totalXp % 500}/{500} XP towards Next Level
        </p>
        <BigProgressBar
          level={totalLevel}
          xp={totalXp % 500}
          maxXp={500}
          color={"#555555"}
        />
      </div>
      {stats.length > 0 ? (
        stats.map((stat) => (
          <div key={stat.name} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {stat.name}
            </h3>
            <ProgressBar
              level={stat.level}
              xp={stat.xpRemaining}
              maxXp={stat.maxXp}
              color={stat.color}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading stats...</p>
      )}
    </div>
  );
};

const ProgressBar = ({ level, xp, maxXp, color }) => {
  const progress = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="mb-4">
      <p className="text-lg font-semibold">Level {level}</p>
      <p className="text-sm text-gray-500 mb-2">
        {xp}/{maxXp} XP towards Next Level
      </p>
      <div
        className="w-full bg-gray-300 rounded-full shadow-sm overflow-hidden relative"
        style={{ height: "15px", width: "500px", backgroundColor: "#CCCCCC" }}
      >
        <div
          className="absolute top-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            height: "15px",
          }}
        />
      </div>
    </div>
  );
};

const BigProgressBar = ({ level, xp, maxXp, color }) => {
  const progress = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="mb-4">
      <div
        className="w-full bg-gray-300 rounded-full shadow-sm overflow-hidden relative"
        style={{ height: "20px", width: "500px", backgroundColor: "#CCCCCC" }}
      >
        <div
          className="absolute top-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            height: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default StatsPage;
