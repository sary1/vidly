const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./Genre");
const { Schema } = mongoose();

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    trim: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).require(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).require(),
    genre: Joi.objectId().required(),
  });
  return schema.validate(movie);
};

const Movie = mongoose.model("Movie", movieSchema);
module.exports = { Movie, movieSchema, validateMovie };
