const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught Exception
process.on("uncaughtException" ,(err) => {
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server for handling uncaught exception`)
});


// connect db
connectDatabase

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection",(err) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`Shutting down the server for unhandel promise rejection`)
})