import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate('/tasks')
    }

    const signUp = () => {
        navigate('/signup')
    }

    return (
        <div className="login-page">
            <h1 className="title">⚔️ Welcome to Task Adventure</h1>
            <form>
                <h2><label>📧 Email</label></h2>
                <input type="text"
                    placeholder="example@address.com"/>

                <h2><label>🔑 Password</label></h2>
                <input type="text"/>

                <br/><br/><br/><br/>
        
                <div className="input-container">
                    <button onClick={login}>Login</button>
                    <button onClick={signUp}>Sign Up</button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;
