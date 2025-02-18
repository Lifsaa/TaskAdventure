import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  // Fetch tasks from the backend
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
    const taskData = { label: newTask, date: newDate };

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

  return (
    <div>
      <h1>Task List</h1>

      {/* Input for new task */}
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
      <button onClick={addTask}>Add Task</button>

      {/* Active Tasks */}
      <h2>Active Tasks</h2>
      {activeTasks.length === 0 && <p>No active tasks!</p>}
      {activeTasks.map((task) => (
        <div key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task.id)}
            />
            {task.label} - {task.date}
          </label>
          <button onClick={() => removeTask(task.id)}>Remove</button>
        </div>
      ))}

      {/* Completed Tasks */}
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 && <p>No completed tasks!</p>}
      {completedTasks.map((task) => (
        <div key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task.id)}
            />
            <s>{task.label} - {task.date}</s> {/* Strikethrough for completed */}
          </label>
          <button onClick={() => removeTask(task.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default App;
