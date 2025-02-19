import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Easy");

  // Fetch tasks from the backend (optional)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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
        headers: { "Content-Type": "application/json" },
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
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
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
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
    <div className="app-container">
      <h1 className="title">⚔️ Task Adventure</h1>

      {/* Input Section */}
      <div className="input-container">
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
      <h2>📝 Active Tasks</h2>
      {activeTasks.length === 0 && <p>No active tasks!</p>}
      <div className="task-list">
        {activeTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleTask(task.id)}
              />
              {task.label} - {task.date}
            </label>
            <span
              className="difficulty"
              style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
            >
              {task.difficulty}
            </span>
            <button onClick={() => removeTask(task.id)}>❌</button>
          </div>
        ))}
      </div>

      {/* Completed Tasks */}
      <h2>🎯 Completed Tasks</h2>
      {completedTasks.length === 0 && <p>No completed tasks!</p>}
      <div className="task-list">
        {completedTasks.map((task) => (
          <div className="task-card completed" key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.checked}
              />
              <s>
              {task.label} - {task.date}
              </s>
            </label>
            <span
              className="difficulty"
              style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
            >
              {task.difficulty}
            </span>
            <button onClick={() => removeTask(task.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
