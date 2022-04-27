const { Genre } = require("../models/Genre");
const { Movie, validateMovie } = require("../models/Movie");

const getMovie = (req, res) => {
  res.send("Hi movies");
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

module.exports = { getMovie, createMovie };
