const express = require("express");
const router = express.Router();

const { getGenres, createGenre } = require("../controllers/genres");

router.get("/", getGenres);
router.post("/", createGenre);

module.exports = router;
