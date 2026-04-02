const express = require("express");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Assignment2 API is running",
  });
});

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
