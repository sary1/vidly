const dotenv = require("dotenv");
const connectDB = require("./middleware/db");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const genreRouter = require("./routes/genres");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const rentalRouter = require("./routes/rentals");
const customerRouter = require("./routes/customers");
const authRouter = require("./routes/auth");

const express = require("express");
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI, port, app);

app.use(express.json());
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/rentals", rentalRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello world");
});
