const express = require("express");
const router = express.Router();

const { getGenres, createGenre } = require("../controllers/genres");
const auth = require("../middleware/auth");

router.get("/", getGenres);
router.post("/", auth, createGenre);

module.exports = router;
