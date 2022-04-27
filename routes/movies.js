const express = require("express");
const router = express.Router();

const { getMovie } = require("../controllers/movies");

router.get("/", getMovie);

module.exports = router;
