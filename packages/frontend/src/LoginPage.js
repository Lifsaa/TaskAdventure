import React, { useState, useEffect } from "react";

const LoginPage = () => {
    const login = async () => {

    }

    const createAccount = async () => {

    }

    return (
        <div className="login-page">
            <h1 className="title">⚔️ Welcome to Task Adventure</h1>
            <form>
                <h2><label>📧 Email</label></h2>
                <input type="text"/>

                <h2><label>🔑 Password</label></h2>
                <input type="text"/>

                <br/><br/><br/><br/>
        
                <div className="input-container">
                    <button onClick={login}>Login</button>
                    <button onClick={createAccount}>Create Account</button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;
