require("dotenv").config();
require("express-async-errors");

const express = require("express");
const AppError = require("./utils/AppError");
const router = require("./routes");
const cors = require("cors");

// app use
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Exception handling
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

// server startup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server is running" + PORT);
});
