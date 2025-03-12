import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const TaskPage = ({ token }) => {
  const [stats, setStats] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Easy");
  const [newSocialStat, setNewSocialStat] = useState("Intelligence");
  const theme = useTheme(); // Get current theme

  const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    //Fetches stats from backend to initialize them
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
            setStats(processStats(data));
          }
        } else {
          console.error("Error fetching stats");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    // Fetch tasks from the backend
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
    fetchStats();
    fetchTasks();
  }, [token]);

  //Initializes stats if not set up yet
  const initializeStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/initialize-stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const newStats = await response.json();
        const processedStats = processStats(newStats);
        setStats(processedStats);
      } else {
        console.error("Error initializing stats");
      }
    } catch (error) {
      console.error("Error during stats initialization:", error);
    }
  };

  //Processes stats
  const processStats = (stats) => {
    return stats.map((stat) => ({
      ...stat,
      level: Math.ceil((stat.xp + 0.1) / 100),
      xpRemaining: stat.xp % 100,
      maxXp: 100,
    }));
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "" || newDate.trim() === "") return;
    const taskData = {
      label: newTask,
      date: newDate,
      difficulty: newDifficulty,
      socialstat: newSocialStat,
      checked: false,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setNewTask("");
        setNewDate("");
        setNewDifficulty("Easy");
        setNewSocialStat("Intelligence");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task checked status and update stats
  const toggleTask = async (id) => {
    try {
      // First get the task to check its current state
      const task = tasks.find((t) => t._id === id);

      // If the task is being marked as complete (not already checked and no xp gained from completion), prepare to update stats
      const isCompleting = task && !task.checked;

      // Update task status
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));

        // If completing the task, update the corresponding stat
        if (isCompleting) {
          // Determine XP amount based on difficulty
          let xpAmount = 10; // Default for Easy
          if (task.difficulty === "Medium") xpAmount = 20;
          if (task.difficulty === "Hard") xpAmount = 30;

          // Update the stat based on the task's socialstat value
          await updateStat(task.socialstat, xpAmount);
        } else {
          let xpAmount = -10; // Default for Easy
          if (task.difficulty === "Medium") xpAmount = -20;
          if (task.difficulty === "Hard") xpAmount = -30;

          // Update the stat based on the task's socialstat value
          await updateStat(task.socialstat, xpAmount);
        }
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Update a specific stat
  const updateStat = async (statName, xpAmount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          statName: statName,
          xpAmount: xpAmount,
        }),
      });

      if (!response.ok) {
        console.error("Error updating stat");
      }
    } catch (error) {
      console.error("Error updating stat:", error);
    }
  };

  // Delete a task
  const removeTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Separate active and completed tasks
  const activeTasks = tasks.filter((task) => !task.checked);
  const completedTasks = tasks.filter((task) => task.checked);

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#4caf50";
      case "Medium":
        return "#ff9800";
      case "Hard":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };
  // Get social stat color
  const getSocialStatColor = (socialstat) => {
    switch (socialstat) {
      case "Creativity":
        return "#3ba8f6";
      case "Healthfulness":
        return "#278a58";
      case "Kindness":
        return "#f43f5e";
      case "Intelligence":
        return "#a88aed";
      case "Sociability":
        return "#f5c20b";
      case "Skillfulness":
        return "#876148";
      default:
        return "#9e9e9e";
    }
  };

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
        ⚔️ Task Adventure
      </Typography>

      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "8px",
            flex: 1,
            maxWidth: "200px",
          }}
        />
        <TextField
          variant="outlined"
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "8px",
            flex: 1,
            maxWidth: "200px",
          }}
        />
        <Select
          value={newDifficulty}
          onChange={(e) => setNewDifficulty(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "8px",
            flex: 1,
            maxWidth: "200px",
          }}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
        <Select
          value={newSocialStat}
          onChange={(e) => setNewSocialStat(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "8px",
            flex: 1,
            maxWidth: "200px",
          }}
        >
          <MenuItem value="Creativity">Creativity</MenuItem>
          <MenuItem value="Healthfulness">Healthfulness</MenuItem>
          <MenuItem value="Intelligence">Intelligence</MenuItem>
          <MenuItem value="Kindness">Kindness</MenuItem>
          <MenuItem value="Skillfulness">Skillfulness</MenuItem>
          <MenuItem value="Sociability">Sociability</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          sx={{
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* Active Tasks */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        📝 Active Tasks
      </Typography>
      {activeTasks.length === 0 && (
        <Typography
          sx={{ textAlign: "left", color: theme.palette.text.secondary }}
        >
          No active tasks!
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        {activeTasks.map((task) => (
          <Paper
            key={task._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: theme.palette.background.paper,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 5px rgba(255, 255, 255, 0.1)"
                  : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task._id)}
              />
              {task.label} - {task.date}
            </label>
            <span
              className="difficulty"
              style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
            >
              {task.difficulty}
            </span>
            <span
              className="socialstat"
              style={{ backgroundColor: getSocialStatColor(task.socialstat) }}
            >
              {task.socialstat}
            </span>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => removeTask(task._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Completed Tasks */}
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        🎯 Completed Tasks
      </Typography>
      {completedTasks.length === 0 && (
        <Typography
          sx={{ textAlign: "left", color: theme.palette.text.secondary }}
        >
          No completed tasks!
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        {completedTasks.map((task) => (
          <Paper
            key={task._id}
            sx={{
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
              textDecoration: "line-through",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderRadius: "10px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 5px rgba(255, 255, 255, 0.1)"
                  : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task._id)}
              />
              <Typography component="s">
                {task.label} - {task.date}
              </Typography>
            </label>
            <span
              className="difficulty"
              style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
            >
              {task.difficulty}
            </span>

            <span
              className="socialstat"
              style={{ backgroundColor: getSocialStatColor(task.socialstat) }}
            >
              {task.socialstat}
            </span>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => removeTask(task._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      <Button
        variant="contained"
        color="error"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        sx={{
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "14px",
          marginTop: "20px",
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default TaskPage;
