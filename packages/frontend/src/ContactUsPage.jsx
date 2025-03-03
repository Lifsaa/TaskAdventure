// ContactUsPage.js
import React, { useState } from "react";
import styles from "./ContactUsPage.module.css";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setStatus("Thank you for contacting us! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send your message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message");
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default ContactUsPage;