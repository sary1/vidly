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
    const movie = new Movie({
      ...req.body,
      genre: { _id: genre._id, name: genre.name },
    });
    await movie.save();

    res.status(200).json({ movie });
  } catch (error) {
    return error.code === 11000
      ? res.status(500).json({ error: "The input string must be unique" })
      : res.status(500).json({ error: error.errors.name.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ movie });
  } catch (error) {
    return error.code === 11000
      ? res.status(500).json({ error: "The input string must be unique" })
      : res.status(500).json({ error });
  }
};

module.exports = { getMovies, getMovie, createMovie, updateMovie };
