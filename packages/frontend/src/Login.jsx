import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["app-title"]}>Log In</h1>
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

        <button type="submit">Log In</button>
      </form>

      {message && <p className={styles["error-message"]}>{message}</p>}
    </div>
  );
};

export default Login;
