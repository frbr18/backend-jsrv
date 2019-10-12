const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require("../db/database.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "AverySecretThing";

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const date = req.body.date;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        const sql = "INSERT INTO users (name, email, password, date) values (?, ?, ?, ?);";
        if (err) {
            return res.status(501).json({
                errors: {
                    status: 501,
                    source: "/register",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
        }
        db.run(sql, name, email, hash, date, (error) => {
            if (error) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST /user/register",
                        title: "Database error",
                        detail: error.message
                    }
                });
            }
            res.status(200).json({
                success: {
                    status: 200,
                    source: "POST /user/register",
                    title: "User registered"
                }
            });
        });
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "Select * from users where email = ?;";

    db.get(sql, email, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/user/login",
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        if (rows === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/user/login",
                    title: "User not found",
                    detail: "User with provided email not found."
                }
            });
        }

        const user = rows;
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }
            if (result) {
                let payload = { email: user.email };
                let jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });
                return res.json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: user.email,
                        token: jwtToken
                    }
                })
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Wrong password",
                    detail: "Password is incorrect."
                }
            });
        })
    })


});

module.exports = router;