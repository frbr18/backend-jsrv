const express = require('express');
const router = express.Router();
const db = require('../db/database.js');

router.get('/', function (req, res) {
    const sql = "Select * from reports;";
    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "GET /reports",
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        res.json({
            data: rows
        });
    });
});

router.get('/:id', function (req, res) {
    const sql = "select * from reports where _id = ?;";
    const id = req.params.id;

    db.get(sql, id, (err, row) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "GET /reports/:id",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.status(200).json({
            data: row
        });
    });
});


router.post('/create', function (req, res) {
    const sql = "INSERT INTO reports (title, content) values (?, ?);";
    const title = req.body.title;
    const content = req.body.content;

    db.run(sql, title, content, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    status: 500,
                    source: "POST /reports",
                    title: "Database error",
                    detail: err.message
                }
            })
        }
        res.status(200).json({
            success: {
                status: 200,
                source: "POST /reports",
                title: "Report added"
            }
        });
    })
});

router.put('/edit', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;
    const sql = "update reports set title = ?, content = ? where _id = ?;";

    db.run(sql, title, content, id, (err) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "PUT /reports/edit/:id",
                    title: "Database error",
                    detail: err.message
                }
            })
        }
        res.status(200).json({
            success: {
                status: 200,
                source: "PUT /reports",
                title: "Report updated"
            }
        })
    });
})

router.delete('/delete/:id', (req, res) => {
    const sql = "Delete from reports where _id = ?;";
    const id = req.params.id;

    db.run(sql, id, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    status: 500,
                    source: "DELETE /reports/delete/:id",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.status(200).json({
            success: {
                status: 200,
                source: "DELETE /reports/delete/:id",
                title: "Report deleted"
            }
        })
    })
});

module.exports = router;