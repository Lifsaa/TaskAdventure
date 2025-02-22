import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import TaskPage from "./TaskPage";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route
            path="/"
            element={token ? <TaskPage token={token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;