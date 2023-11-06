require("dotenv").config();
require("express-async-errors");

const express = require("express");
const AppError = require("./utils/AppError");
const router = require("./routes");
const cors = require("cors");
const knex = require("../src/database/knex");
const uploadConfig = require("./configs/uploadConfig");

// app use
const app = express();
app.use(
  cors({
    origin: [
      "https://food-explorer-3.netlify.app",
      "hhttps://food-explorer-delivery.vercel.app",
      "http://localhost:5173",
      ,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));

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

async function testDb() {
  const [test] = await knex("users");

  if (!test) {
    console.log("❌ error connecting to database");
  }

  console.log("📂 connected database");
}

testDb();

// server startup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server is running");
});
