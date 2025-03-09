import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CalendarPage from "./pages/CalendarPage";
import StatsPage from "./pages/StatsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Layout from "./components/Layout"; // Import Layout component
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Retrieve theme preference from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Define light and dark themes dynamically
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#90caf9" : "#1976d2",
          },
          background: {
            default: darkMode ? "#121212" : "#ffffff",
            paper: darkMode ? "#1e1e1e" : "#f5f5f5",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies global background & text colors */}
      <Router>
        <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup setToken={setToken} />} />
            <Route
              path="/"
              element={
                token ? <TaskPage token={token} /> : <Navigate to="/login" />
              }
            />
            <Route path="/tasks" element={<TaskPage token={token} />} />
            <Route path="/calendar" element={<CalendarPage token={token} />} />
            <Route path="/stats" element={<StatsPage token={token} />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;

