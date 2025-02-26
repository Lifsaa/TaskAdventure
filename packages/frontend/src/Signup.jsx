import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function back() {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setMessage("Signup successful!");
      } else {
        setMessage(`Signup failed: ${data.message || response.statusText}`);
      }
    } catch (error) {
      setMessage(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <h1 className={styles["app-title"]}>⚔️ Account Creation</h1>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
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

        <div className={styles["input-container"]}>
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>Confirm Password</label>
        </div>

        <div className="button-container">
          <button type="submit">Sign Up</button>
          <button type="button"
            onClick={back}>Back</button>
        </div>
      </form>
      {message && <p className={styles["error-message"]}>{message}</p>}
    </div>
  );
};

export default Signup;
