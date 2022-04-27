const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
