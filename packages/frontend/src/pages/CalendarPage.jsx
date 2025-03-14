import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/CalendarPage.module.css";

const CalendarPage = ({ token }) => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("Easy");
  const [socialStat, setSocialStat] = useState("Intelligence");

  const API_BASE_URL =
    import.meta.env.VITE_API_BACKEND_URL || "http://localhost:5001/api";
  console.log("API_BASE_URL from env:", import.meta.env.VITE_API_BACKEND_URL);
  console.log("Final API_BASE_URL used:", API_BASE_URL);

  useEffect(() => {
    if (!token) return;

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

  const handleAddTask = async () => {
    console.log("Add task button clicked"); // Debugging
    if (!taskInput.trim()) return;

    const newTask = {
      label: taskInput,
      date: date.toISOString().split("T")[0],
      difficulty: taskDifficulty,
      socialstat: socialStat,
      checked: false,
    };

    try {
      console.log("POST Request URL:", `${API_BASE_URL}/tasks`); // Debugging
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const newTaskFromServer = await response.json();
        setTasks([...tasks, newTaskFromServer]);
        setTaskInput("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getTileContent = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const tasksForDate = tasks.filter((task) => task.date === dateString);

    return (
      <div className={styles.taskIndicators}>
        {tasksForDate.map((task, index) => (
          <div
            key={index}
            className={`${styles.taskDot} ${styles[task.difficulty.toLowerCase()]}`}
            data-tooltip={task.label}
            title={task.label}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.title}>Task Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={getTileContent}
        className={styles.reactCalendar}
      />

      {/* Task Input Section */}
      <div className={styles.taskInputContainer}>
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className={styles.taskInput}
        />
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          className={styles.dateInput}
        />
        <select
          value={taskDifficulty}
          onChange={(e) => setTaskDifficulty(e.target.value)}
          className={styles.difficultySelect}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          value={socialStat}
          onChange={(e) => setSocialStat(e.target.value)}
          className={styles.difficultySelect}
        >
          <option value="Creativity">Creativity</option>
          <option value="Healthfulness">Healthfulness</option>
          <option value="Intelligence">Intelligence</option>
          <option value="Kindness">Kindness</option>
          <option value="Skillfulness">Skillfulness</option>
          <option value="Sociability">Sociability</option>
        </select>
        <button onClick={handleAddTask} className={styles.addTaskButton}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;
