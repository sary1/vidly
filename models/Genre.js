const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const genreSchema = new Schema({
  name: {
    type: String,
    minLength: [3, "The input string is too short"],
    maxLength: [255, "The input string is too long"],
    required: true,
    unique: true,
  },
});

const schema = new mongoose.Schema(genreSchema);
const Genre = mongoose.model("Genre", schema);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(genre);
};

module.exports = { Genre, genreSchema, validateGenre };
