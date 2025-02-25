import React, { useState, useEffect } from "react";
import styles from "./TaskPage.module.css";

const TaskPage = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Easy");

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks", {
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

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "" || newDate.trim() === "") return;
    const taskData = {
      label: newTask,
      date: newDate,
      difficulty: newDifficulty,
      checked: false,
    };

    try {
      const response = await fetch("http://localhost:5000/tasks", {
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
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task checked status
  const toggleTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const removeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
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

  return (
    <div className={styles["task-container"]}>
      <h1 className={styles["task-title"]}>⚔️ Task Adventure</h1>

      {/* Input Section */}
      <div className={styles["input-container"]}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select
          value={newDifficulty}
          onChange={(e) => setNewDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Active Tasks */}
      <h2 className={styles["task-section"]}>📝 Active Tasks</h2>
      {activeTasks.length === 0 && (
        <p className={styles["empty-message"]}>No active tasks!</p>
      )}
      <div className={styles["task-list"]}>
        {activeTasks.map((task) => (
          <div className={styles["task-card"]} key={task._id}>
            <label>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task._id)}
              />
              {task.label} - {task.date}
            </label>
            <button
              onClick={() => removeTask(task._id)}
              className={styles["delete-btn"]}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Completed Tasks */}
      <h2 className={styles["task-section"]}>🎯 Completed Tasks</h2>
      {completedTasks.length === 0 && (
        <p className={styles["empty-message"]}>No completed tasks!</p>
      )}
      <div className={styles["task-list"]}>
        {completedTasks.map((task) => (
          <div className={styles["completed"]} key={task._id}>
            <label>
              <input type="checkbox" checked={task.checked} />
              <s>
                {task.label} - {task.date}
              </s>
            </label>
            <button
              onClick={() => removeTask(task._id)}
              className={styles["delete-btn"]}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className={styles["logout-btn"]}
      >
        Log Out
      </button>
    </div>
  );
};

export default TaskPage;
