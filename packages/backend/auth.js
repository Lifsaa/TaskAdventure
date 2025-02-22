import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


const creds = [];


export function registerUser(req, res) {
    const { username, email, password } = req.body; // from form

    if (!username || !email || !password) {
        res.status(400).send("Bad request: Invalid input data.");

    } else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken");

    } else if (creds.find((c) => c.email === email)) {
        res.status(409).send("Email already in use");

    } else {
        bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                generateAccessToken(email).then((token) => {
                    console.log("Token:", token);
                    res.status(201).send({ token: token });
                    creds.push({ username, email, hashedPassword });
                });
            });
    }
}


export function loginUser(req, res) {
    const { email, password } = req.body; // from form
    const retrievedEmail = creds.find(
        (c) => c.email === email
    );

    if (!retrievedEmail) {
        // invalid username
        res.status(401).send("Unauthorized");

    } else {
        bcrypt
            .compare(password, retrievedEmail.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(email).then((token) => {
                        res.status(200).send({ token: token });
                    });
                } else {
                    // invalid password
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    }
}


export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            (error, decoded) => {
                if (decoded) {
                    next();
                } else {
                    console.log("JWT error:", error);
                    res.status(401).end();
                }
            }
        );
    }
}


function generateAccessToken(email) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { email: email },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}
