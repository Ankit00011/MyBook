const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.set("trust proxy", 1);

const allowedOrigin = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Database not connected! " + error);
  });
