import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pwd }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;