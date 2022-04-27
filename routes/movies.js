const express = require("express");
const router = express.Router();

const { getMovie, createMovie } = require("../controllers/movies");

router.get("/", getMovie);
router.post("/", createMovie);

module.exports = router;
