const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.patch("/:id", updateMovie);

module.exports = router;
