const express = require(express);


//App config
const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    });
}

//Middleware:




module.exports = app;  