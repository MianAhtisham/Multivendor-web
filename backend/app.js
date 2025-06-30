const express = require('express');
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors")

// Create the app first
const app = express();

// App config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    });
}

// Middlewares (after app is created)
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// import routes
const user = require("./controller/user");

app.use("/api/v2/user", user);

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
