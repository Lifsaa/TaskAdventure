import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, label: "To clean dishes", checked: false, date: "February 14" },
    { id: 2, label: "To do laundry", checked: false, date: "February 14" },
  ]);
  const [newTask, setNewTask] = useState(""); 
  const [newDate, setNewDate] = useState(""); // State for custom date

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "" || newDate.trim() === "") return; // Prevent adding tasks with missing name or date
    const newTaskObject = {
      id: Date.now(), // Unique ID using timestamp
      label: newTask, // Task name from input
      date: newDate,  // Custom date from input
      checked: false,
    };
    setTasks([...tasks, newTaskObject]); // Add the new task object to the list
    setNewTask(""); // Clear the task input field
    setNewDate(""); // Clear the date input field
  };

  // Remove a task by its id
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle checkbox state for a task
  const handleChange = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, checked: !task.checked } : task
    ));
  };

  return (
    <div>
      <h1>TASK LIST</h1>
      
      {/* Input fields to add new task and custom date */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)} // Update task name state
        placeholder="Enter a new task"
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)} // Update date state
        placeholder="Enter task date"
      />
      <button onClick={addTask}>Add Task</button>
      
      {/* Display tasks */}
      {tasks.map((task) => (
        <div key={task.id}>
          <label>
            {task.label} - {task.date}
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => handleChange(task.id)}
            />
          </label>
          <button onClick={() => removeTask(task.id)}>Gain XP</button>
        </div>
      ))}
    </div>
  );
};

export default App;
