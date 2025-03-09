import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username); // Store username in local storage
        navigate("/tasks");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["app-title"]}>⚔️ Welcome to Task Adventure</h1>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <div className={styles["input-container"]}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=" "
          />
          <label>Username</label>
        </div>

        <div className={styles["input-container"]}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <div className="button-container">
          <button type="submit">Log In</button>
          <button onClick={signUp} type="button">
            Sign Up
          </button>
        </div>
      </form>

      {message && <p className={styles["error-message"]}>{message}</p>}
    </div>
  );
};

export default Login;
