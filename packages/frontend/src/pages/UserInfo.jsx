import React, { useState, useEffect } from "react";
import styles from "../styles/TaskPage.module.css";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Avatar,
} from "@mui/material";

const TaskPage = ({ token }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState([]);
  const theme = useTheme(); // Get current theme

  const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Error fetching tasks");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTasks();
  }, [token]);

  const completedTasks = tasks.filter((task) => task.checked);

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
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
         User Info
      </Typography>

      <div style={{ display: "inline-flex", alignItems:"center"}}>
        <Avatar
          sx={{ bgcolor: "blue", width: 100, height: 100 }}
        />
        <Typography variant="h6" sx={{ textAlign: "left", marginLeft: "20px" }}>
          {username}
        </Typography>
        
      </div>

      {/* Tasks Completed */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
       ⚡ Total Tasks
      </Typography>
      <Typography
        sx={{ textAlign: "left", color: theme.palette.text.secondary, marginLeft: "30px"}}>
        {tasks.length}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
      </Box>

      {/* Tasks Completed */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
       ✅ Tasks Completed
      </Typography>
      <Typography
        sx={{ textAlign: "left", color: theme.palette.text.secondary, marginLeft: "30px"}}>
        {completedTasks.length}
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
        localStorage.removeItem("token"); // Clear token on logout
        localStorage.removeItem("username"); // Clear username on logout
        window.location.href = "/login"; // Redirect to login page
      }}
    > Log Out </button>
    </Box>


    </Box>
  );
};

export default TaskPage;
