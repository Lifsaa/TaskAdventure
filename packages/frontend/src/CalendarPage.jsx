import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarPage.module.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("Easy");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: tasks.length + 1,
      text: taskInput,
      date: date.toISOString().split("T")[0],
      difficulty: taskDifficulty,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // Get tasks for a specific date
  const getTileContent = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const tasksForDate = tasks.filter((task) => task.date === dateString);

    return (
      <div className={styles.taskIndicators}>
        {tasksForDate.map((task, index) => (
          <span
            key={index}
            className={`${styles.taskDot} ${styles[task.difficulty.toLowerCase()]}`}
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
        <button onClick={handleAddTask} className={styles.addTaskButton}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;
