const { Genre } = require("../models/Genre");
const { Movie, validateMovie } = require("../models/Movie");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ error: "No movie with the given ID" });
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).json({ error: "Invalid Genre" });

  try {
    const movie = new Movie(req.body);
    await movie.save();

    res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const genre = await Genre.findById(req.body.genre);
    if (!genre) return res.status(400).json({ error: "Invalid Genre" });

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie: deleteMovie,
};
