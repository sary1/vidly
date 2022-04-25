const { Genre } = require("../models/Genre");

const getGenres = (req, res) => {
  res.send("Genres from controllers");
};

const createGenre = async (req, res) => {
  const genre = req.body;
  await Genre.create(genre);
  res.status(201).send(genre);
};

module.exports = { getGenres, createGenre };
