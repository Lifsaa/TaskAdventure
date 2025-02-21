import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const SignupPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password :"",
        confirmedPassword :""
    })
    const [validationError, setValidationError] = useState("")


    function back () {
        navigate('/')
    }


    function createAccount () {

        // Input validation
        let validationString = inputValidation();

        if (validationString.length > 0) {
            setValidationError(validationString);
            return;
        }
    }


    function inputValidation () {
        const emailInput = document.getElementById('email');
        let validationString = "";

        // Input trimming
        userInfo["username"] = userInfo["username"].trim();
        userInfo["email"] = userInfo["email"].trim();
        userInfo["password"] = userInfo["password"].trim();
        userInfo["confirmedPassword"] = userInfo["confirmedPassword"].trim();


        // Input validation
        if (userInfo["username"] === "" || userInfo["email"] === "" ||
            userInfo["password"] === "" || userInfo["confirmedPassword"] === "") {

            validationString += "One or more fields are blank";
        }

        if (!emailInput.validity.valid) {
            if (validationString.length > 0) validationString += "\n";
            validationString += "Invalid email format";
        }

        if (userInfo["password"] != userInfo["confirmedPassword"]) {
            if (validationString.length > 0) validationString += "\n";
            validationString += "Passwords do not match";
        }

        return validationString;
    }


    function handleChange(event) {
        const { name, value } = event.target;

        switch (name) {
            case "username":
                setUserInfo({
                    username: value,
                    email: userInfo["email"],
                    password: userInfo["password"],
                    confirmedPassword: userInfo["confirmedPassword"],
                })
                break;

            case "email":
                setUserInfo({
                    username: userInfo["username"],
                    email: value,
                    password: userInfo["password"],
                    confirmedPassword: userInfo["confirmedPassword"],
                })
                break;

            case "password":
                setUserInfo({
                    username: userInfo["username"],
                    email: userInfo["email"],
                    password: value,
                    confirmedPassword: userInfo["confirmedPassword"],
                })
                break;

            case "confirmedPassword":
                setUserInfo({
                    username: userInfo["username"],
                    email: userInfo["email"],
                    password: userInfo["password"],
                    confirmedPassword: value,
                })
                break;
        }

        setValidationError("");
    }


    return (
        <div className="login-page">
            <h1 className="title">⚔️ Account Signup</h1>
            <form>
                <h2><label>👤 Username</label></h2>
                <input type="text"
                    name="username"
                    onChange={handleChange}
                    value={userInfo.username}/>

                <h2><label>📧 Email</label></h2>
                <input type="email"
                    id="email"
                    name="email"
                    placeholder="example@address.com"
                    onChange={handleChange}
                    value={userInfo.email}/>

                <h2><label>🔑 Password</label></h2>
                <input type="password"
                    name="password"
                    onChange={handleChange}
                    value={userInfo.password}/>

                <h2><label>🔑 Confirm Password</label></h2>
                <input type="password"
                    name="confirmedPassword"
                    onChange={handleChange}
                    value={userInfo.confirmedPassword}/>

                
                <div className="input-validation">
                    <p>{validationError}</p>
                </div>

                <br/><br/><br/>
        
                <div className="input-container">
                    <button onClick={back}>Back</button>
                    <button onClick={createAccount}
                        type="button">Create Account</button>
                </div>
            </form>
        </div>
    )
};

export default SignupPage;
