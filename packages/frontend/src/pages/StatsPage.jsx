import React, { useState, useEffect } from "react";
import styles from "../styles/StatsPage.module.css";
import { useTheme } from "@mui/material/styles";

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

const StatsPage = ({ token }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            await initializeStats();
          } else {
            setStats(processStats(data)); // Process XP to Level & XP Remaining
          }
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

  const initializeStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/initialize-stats`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const newStats = await response.json();
        setStats(processStats(newStats));
      } else {
        console.error("Error initializing stats");
      }
    } catch (error) {
      console.error("Error during stats initialization:", error);
    }
  };

  const processStats = (stats) => {
    return stats.map(stat => ({
      ...stat,
      level: Math.ceil((stat.xp+.1) / 100),
      xpRemaining: stat.xp % 100,
      maxXp: 100 // Always 100 XP needed for the next level
    }));
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-black tracking-wider">
        User Stats
      </h2>
      {stats.length > 0 ? (
        stats.map((stat) => (
          <div key={stat.name} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{stat.name}</h3>
            <ProgressBar level={stat.level} xp={stat.xpRemaining} maxXp={stat.maxXp} color={stat.color} />
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
        {xp}/{maxXp} XP to Next Level
      </p>
      <div className="w-full bg-gray-200 rounded-full shadow-sm overflow-hidden" style={{ height: "15px", width: "500px" }}>
        <div className="rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: color, height: "15px" }} />
      </div>
    </div>
  );
};

export default StatsPage;