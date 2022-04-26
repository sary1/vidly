const { Genre, validateGenre } = require("../models/Genre");
const Joi = require("joi");

const getGenres = async (req, res) => {
  const genres = await Genre.find();
  res.status(200).json({ genres });
};

const createGenre = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ error: "Access Denied" });
  const genre = req.body;

  const { error } = validateGenre(genre);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    await Genre.create(genre);
    return res.status(201).json({ genre });
  } catch (error) {
    return error.code === 11000
      ? res.status(400).json({ error: "The input string must be unique" })
      : res.status(400).json({ error: error.errors.name.message });
  }
};

module.exports = { getGenres, createGenre };
