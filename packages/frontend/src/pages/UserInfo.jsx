import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Avatar } from "@mui/material";

const UserInfo = ({ token }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [email, setEmail] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [totalLevel, setTotalLevel] = useState(1);
  const theme = useTheme();

  const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/info`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const { username, email } = await response.json();
          console.log("Username:", username);
          console.log("Email:", email);
          setUsername(username);
          setEmail(email);
        } else {
          console.error("Error fetching user info, status:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchTaskCounts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const { totalTasks, completedTasks } = await response.json();
          console.log("Total Tasks:", totalTasks);
          console.log("Completed Tasks:", completedTasks);
          setTotalTasks(totalTasks);
          setCompletedTasks(completedTasks);
        } else {
          console.error("Error fetching task counts, status:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchTotalXpAndLevel = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stats/total-xp-level`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const { totalXp, totalLevel } = await response.json();
          console.log("Total XP:", totalXp);
          console.log("Total Level:", totalLevel);
          setTotalXp(totalXp);
          setTotalLevel(totalLevel);
        } else {
          console.error(
            "Error fetching total XP and level, status:",
            response.status,
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserInfo();
    fetchTaskCounts();
    fetchTotalXpAndLevel();
  }, [token]);

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: theme.palette.background.default,
        borderRadius: "12px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 8px rgba(255, 255, 255, 0.1)"
            : "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
      >
        User Info
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }} />
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          {username}
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          {email}
        </Typography>
      </Box>

      {/* Total Tasks */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        ⚡ Total Tasks
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          color: theme.palette.text.secondary,
          marginLeft: "30px",
        }}
      >
        {totalTasks}
      </Typography>

      {/* Completed Tasks */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        ✅ Tasks Completed
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          color: theme.palette.text.secondary,
          marginLeft: "30px",
        }}
      >
        {completedTasks}
      </Typography>

      {/* Total XP */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        🎮 Total XP
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          color: theme.palette.text.secondary,
          marginLeft: "30px",
        }}
      >
        {totalXp}
      </Typography>

      {/* Total Level */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        🏆 Overall Level
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          color: theme.palette.text.secondary,
          marginLeft: "30px",
        }}
      >
        Level {totalLevel}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/login";
          }}
        >
          Log Out
        </button>
      </Box>
    </Box>
  );
};

export default UserInfo;
