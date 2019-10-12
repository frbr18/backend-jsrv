const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

//Routes
const user = require("./routes/user.js");
const reports = require("./routes/reports.js");

const app = express();
const port = 1333;

app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/reports', reports);
app.use('/user', user);

// Add a route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));
module.exports = server;