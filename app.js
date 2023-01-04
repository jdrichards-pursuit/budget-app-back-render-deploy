// DEPENDENCIES
const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
// CONFIGURATION
const app = express();

// MIDDLEWARE
// app.use(morgan("tiny"));
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Budget App");
});

const tractsController = require("./controllers/tractsController.js");
app.use("/tracts", tractsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
