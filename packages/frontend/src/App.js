import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import TaskPage from "./TaskPage";
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"

const App = () => {

    return (
        <div className="app-container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="tasks" element={<TaskPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
