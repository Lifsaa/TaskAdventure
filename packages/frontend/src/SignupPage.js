import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const back = () => {
        navigate('/')
    }

    const createAccount = () => {
        navigate('/signup')
    }

    return (
        <div className="login-page">
            <h1 className="title">⚔️ Account Creation</h1>
            <form>
                <h2><label>👤 Username</label></h2>
                <input type="text"/>

                <h2><label>📧 Email</label></h2>
                <input type="text"
                    placeholder="example@address.com"/>

                <h2><label>🔑 Password</label></h2>
                <input type="text"/>

                <h2><label>🔑 Confirm Password</label></h2>
                <input type="text"/>

                <br/><br/><br/><br/>
        
                <div className="input-container">
                    <button onClick={back}>Back</button>
                    <button onClick={createAccount}>Create Account</button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;
