// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./middleware/db");

const express = require("express");
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI, port, app);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
